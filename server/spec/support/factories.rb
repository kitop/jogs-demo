# frozen_string_literal: true
module TestHelpers
  module Factories

    def method_missing(method_sym, *arguments, &block)
      if method_sym.to_s =~ /create_(\w+)$/
        object_name = method_sym.to_s[/create_(\w+)$/, 1]
        object = send("build_#{object_name}", *arguments)
        object.save
      else
        super
      end
    end

    def build_user(attrs = {})
      password = Faker::Internet.password
      attributes = {
        email: Faker::Internet.email,
        password: password,
        password_confirmation: password
      }.merge(attrs)

      User.new(attributes)
    end

  end
end
