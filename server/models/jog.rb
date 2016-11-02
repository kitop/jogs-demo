# frozen_string_literal: true
class Jog < Sequel::Model
  include Validations
  plugin :timestamps

  many_to_one :user

  def average_speed
    distance / duration.to_f
  end

  def validate
    super
    validate_presence_of :user_id, :date, :distance, :duration
    validate_greater_than 0, :duration, :distance
  end
end
