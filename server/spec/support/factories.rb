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
        password_confirmation: password,
        role: User::ROLE_USER
      }.merge(attrs)

      User.new(attributes)
    end

    def build_admin(attrs = {})
      build_user(attrs.merge(role: User::ROLE_ADMIN))
    end

    def build_user_manager(attrs = {})
      build_user(attrs.merge(role: User::ROLE_MANAGER))
    end

    def build_jog(attrs = {})
      attributes = {
        user_id: 1,
        date: Date.today,
        distance: 5000,
        duration: 30 * 60
      }.merge(attrs)

      Jog.new(attributes)
    end

  end
end
