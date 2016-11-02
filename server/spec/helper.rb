require "bundler"
Bundler.setup
Bundler.require(:default, :test)
require_relative "../app"

Dir[File.expand_path("../support/**/*.rb", __FILE__)].each { |rb| require rb }


RSpec.configure do |config|
  config.include Rack::Test::Methods
  config.include TestHelpers::JSON
  config.include TestHelpers::Requests
  config.include TestHelpers::Response
  config.include TestHelpers::Factories
  config.include SerializeHelpers

  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end

  def app
    Cuba
  end
end
