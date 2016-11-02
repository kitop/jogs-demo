# frozen_string_literal: true
require_relative "../helper"

RSpec.describe Jogs do
  let(:user) { create_user }
  it "lists current user jogs" do
    jogs = [
      create_jog(user_id: user.id),
      create_jog(user_id: user.id)
    ]

    get_as user, "/jogs"

    expect_response 200
    expect(response_json).to eq serialize(jogs)
  end

  it "creates a jog" do
    date = Date.today
    post_as user, "/jogs", { date: date.iso8601, distance: 4000, duration: 30 * 60 }

    jog = Jog.last

    expect_response 200
    expect(response_json).to eq serialize(jog)
    expect(user.jogs.count).to eq 1
    expect(jog.values).to include(date: date, distance: 4000, duration: 30*60)
  end

  it "shows current user's jog" do
    jog = create_jog user_id: user.id

    get_as user, "/jogs/#{jog.id}"

    expect_response 200
    expect(response_json).to eq serialize(jog)
  end

  it "does not show another user's jog"
  it "edits current user's jog"
  it "does not edit another user's jog"
  it "deletes current user's jog"
  it "does not edit another user's jog"
end
