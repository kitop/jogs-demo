# frozen_string_literal: true
class User < Sequel::Model
  include Shield::Model
  plugin :timestamps

  attr_accessor :password_confirmation
  attr_reader :password

  def fetch(email)
    User.where(email: email).first
  end

  def password=(password)
    @password = password
    super
  end

  def validate
    super
    errors.add(:email, "not valid") if email !~ /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
    errors.add(:email, "already exists") if User.where(email: email).count > 0
    errors.add(:password, "doesn't match confirmation") if password != password_confirmation
    errors.add(:password, "can't be empty") if crypted_password.nil? or crypted_password.empty?
  end
end
