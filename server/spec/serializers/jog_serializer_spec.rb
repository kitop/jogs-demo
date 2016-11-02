# frozen_string_literal: true
require_relative "../helper"

RSpec.describe JogSerializer do

  it "serializes a jog" do
    jog = create_jog

    data = JogSerializer.new(jog).data

    expect(data).to eq({
      id: jog.id,
      user_id: jog.user_id,
      date: jog.date.iso8601,
      distance: jog.distance,
      duration: jog.duration,
      average_speed: jog.average_speed.round(2),
      created_at: jog.created_at.utc.iso8601
    })
  end

end
