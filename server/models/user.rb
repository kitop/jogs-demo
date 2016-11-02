# frozen_string_literal: true
class User < Sequel::Model
  include Shield::Model
  include Validations
  plugin :timestamps

  one_to_many :jogs

  attr_accessor :password_confirmation
  attr_reader :password

  def self.fetch(email)
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
    validate_presence_of(:password)
  end
end
