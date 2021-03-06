# frozen_string_literal: true
require_relative "../helper"

RSpec.describe Sessions do

  it "returns auth token for a user" do
    user = create_user

    post "/sessions", {
      email: user.email,
      password: user.password
    }

    expect_response 200
    expect(response_json).to eq serialize(user, SessionSerializer)
  end

  it "returns unauthorized for invalid login" do
    post "/sessions", {
      email: Faker::Internet.email,
      password: Faker::Internet.password
    }

    expect_response 401
    expect(response_json[:errors]).to include "Invalid email and/or password."
  end
end
