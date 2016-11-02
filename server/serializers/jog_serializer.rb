# frozen_string_literal: true
class JogSerializer
  def initialize(record)
    @record = record
  end

  def data
    {
      id: @record.id,
      user_id: @record.user_id,
      date: @record.date.iso8601,
      distance: @record.distance,
      duration: @record.duration,
      average_speed: @record.average_speed.round(2),
      created_at: @record.created_at.utc.iso8601
    }
  end
end
