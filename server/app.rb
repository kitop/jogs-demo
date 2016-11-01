# frozen_string_literal: true
require "bundler"
require "yaml"
require "logger"
Bundler.require(:default)

Sequel.default_timezone = :utc
RACK_ENV = ENV.fetch("RACK_ENV", "development")
DB = Sequel.connect(
  YAML.load_file(File.expand_path("../config/database.yml", __FILE__))[RACK_ENV]
)
JWT_SECRET = ENV.fetch("JWT_SECRET")

Dir["./lib/**/*.rb"].each  { |rb| require rb }
Dir["./models/**/*.rb"].each  { |rb| require rb }
Dir["./serializers/**/*.rb"].each { |rb| require rb }
Dir["./helpers/**/*.rb"].each { |rb| require rb }
Dir["./routes/**/*.rb"].each  { |rb| require rb }

Cuba.settings[:logger] = Logger.new("log/#{RACK_ENV}.log").tap do |logger|
  logger.formatter = proc do |severity, datetime, progname, msg|
    "#{msg}\n"
  end
end

env_file = File.expand_path("../environment/#{RACK_ENV}.rb", __FILE__)
require env_file if File.exist? env_file

# Cuba.use Rack::CORS
Cuba.use Rack::ConditionalGet
Cuba.use Rack::ETag
Cuba.use Rack::Parser, parsers: {
  "application/json" => proc { |data| Oj.load(data) }
}

Cuba.plugin UserHelpers
Cuba.plugin RouteHelpers

Cuba.define do
  on "signup" do
    run Signup
  end

  on "sessions" do
    run Sessions
  end


  on authenticated do
    on "jogs" do
      run Jogs
    end
  end
end
