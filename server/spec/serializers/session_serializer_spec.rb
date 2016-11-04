# frozen_string_literal: true
require_relative "../helper"

RSpec.describe SessionSerializer do

  it "serializes a user" do
    user = create_user

    data = SessionSerializer.new(user).data

    expect(data).to eq({
      id: user.id,
      email: user.email,
      role: user.role,
      token: AuthToken.issue(user_id: user.id)
    })
  end

end
