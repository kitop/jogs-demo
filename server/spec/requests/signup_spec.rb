# frozen_string_literal: true
require_relative "../helper"

RSpec.describe Signup do
  it "creates a new user" do
    post "/signup", {
      email: "test@test.com",
      password: "pass1234",
      password_confirmation: "pass1234"
    }

    expect_response 200
    expect(User.count).to eq 1
    expect(response_json[:token]).to eq AuthToken.issue({ user_id: User.last.id })
  end
end
