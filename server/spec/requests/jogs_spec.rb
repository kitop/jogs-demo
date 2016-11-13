# frozen_string_literal: true
require_relative "../helper"

RSpec.describe Jogs do
  let(:user) { create_user }
  it "lists current user jogs" do
    jogs = [
      create_jog(user_id: user.id),
      create_jog(user_id: user.id),
      create_jog(user_id: user.id + 1)
    ]

    get_as user, "/users/#{user.id}/jogs"

    expect_response 200
    expect(response_json).to eq serialize(jogs[0..1])
  end

  it "filters by date" do
    jogs = [
      create_jog(user_id: user.id, date: Date.today - 1),
      create_jog(user_id: user.id, date: Date.today - 7)
    ]

    from = (Date.today - 2).iso8601
    to = Date.today.iso8601
    get_as user, "/users/#{user.id}/jogs", { date_from: from, date_to: to }

    expect_response 200
    expect(response_json).to eq serialize(jogs[0..0])
  end

  it "creates a jog" do
    date = Date.today
    post_as user, "/users/#{user.id}/jogs", { date: date.iso8601, distance: 4000, duration: 30 * 60 }

    jog = Jog.last

    expect_response 200
    expect(response_json).to eq serialize(jog)
    expect(user.jogs.count).to eq 1
    expect(jog.values).to include(date: date, distance: 4000, duration: 30*60)
  end

  it "shows current user's jog" do
    jog = create_jog(user_id: user.id)

    get_as user, "/users/#{user.id}/jogs/#{jog.id}"

    expect_response 200
    expect(response_json).to eq serialize(jog)
  end

  it "does not show another user's jog" do
    jog = create_jog(user_id: user.id + 1)

    get_as user, "/users/#{user.id}/jogs/#{jog.id}"

    expect_response 404
    expect(response_json).to eq nil
  end

  it "edits current user's jog" do
    jog = create_jog(user_id: user.id)

    put_as user, "/users/#{user.id}/jogs/#{jog.id}", { distance: 1000, duration: 3600 }

    jog.reload
    expect(jog.distance).to eq 1000
    expect(jog.duration).to eq 3600
    expect_response 200
    expect(response_json).to eq serialize(jog)
  end

  it "does not edit another user's jog" do
    jog = create_jog(user_id: user.id + 1)

    put_as user, "/users/#{user.id}/jogs/#{jog.id}", { distance: 1000, duration: 3600 }

    old_attributes = jog.values
    jog.reload

    expect_response 404
    expect(response_json).to eq nil
    expect(jog.values).to eq old_attributes
  end

  it "deletes current user's jog" do
    jog = create_jog(user_id: user.id)

    delete_as user, "/users/#{user.id}/jogs/#{jog.id}"

    expect_response 204
    expect{ jog.reload }.to raise_error(Sequel::NoExistingObject)
  end

  it "does not delete another user's jog" do
    jog = create_jog(user_id: user.id + 1)

    delete_as user, "/users/#{user.id}/jogs/#{jog.id}"

    expect_response 404
    expect(response_json).to eq nil
    expect{ jog.reload }.not_to raise_error
  end
end
