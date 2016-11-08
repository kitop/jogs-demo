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
      result = if value =~ /\d{4}-\d{2}-\d{2}/
                 Date.strptime(value, "%Y-%m-%d")
               elsif value =~ %r{\d{2}/\d{2}/\d{4}}
                 Date.strptime(value, "%m/%d/%Y")
               end
      self[:date] = result
    end
  rescue
    self[:date] = nil
  end

  def validate
    super
    validate_presence_of :user_id, :distance, :duration
    validate_greater_than 0, :duration, :distance
    begin
      Date.strptime(date, "%Y-%m-%d") unless date.is_a? Date
    rescue ArgumentError, TypeError
      errors.add(:date, "has an invalid format")
    end
  end
end
