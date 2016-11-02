# frozen_string_literal: true
class Jog < Sequel::Model
  include Validations

  def validate
    super
    validate_presence_of :user_id, :date, :distance, :duration
    errors.add(:duration, "has to be greater than 0") if duration and duration < 1
    errors.add(:distance, "has to be greater than 0") if distance and distance < 1
  end
end
