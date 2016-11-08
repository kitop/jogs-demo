# frozen_string_literal: true
class Jog < Sequel::Model
  include Validations
  plugin :timestamps

  many_to_one :user

  def average_speed
    distance / duration.to_f
  end

  def date=(value)
    if value.is_a? Date
      self[:date] = value
    else
      result = Date.strptime(value, "%Y-%m-%d")
      self[:date] = result
    end
  rescue
    self[:date] = nil
  end

  def validate
    super
    validate_presence_of :user_id, :date, :distance, :duration
    validate_greater_than 0, :duration, :distance
    begin
      Date.strptime(date, "%Y-%m-%d") unless date.is_a? Date
    rescue ArgumentError, TypeError
      errors.add(:date, "has an invalid format")
    end
  end
end
