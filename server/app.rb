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
DB.extension :pg_enum
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

Cuba.use Rack::Cors do
  allow do
    origins "*"
    resource "*", headers: :any, methods: %i{ get post put patch delete options }
  end
end
Cuba.use Rack::ConditionalGet
Cuba.use Rack::ETag
Cuba.use Rack::Parser, parsers: {
  "application/json" => proc { |data| Oj.load(data) }
}
Cuba.use Rack::CommonLogger, Cuba.settings[:logger]

Cuba.plugin UserHelpers
Cuba.plugin RouteHelpers
Cuba.plugin SerializeHelpers

Cuba.define do
  on "signup" do
    run Signup
  end

  on "sessions" do
    run Sessions
  end

  on "jogs" do
    on authenticated do
      run Jogs
    end

    on default do
      unauthorized
    end
  end

  on authenticated, "admin" do
    run Admin
  end
end
