# frozen_string_literal: true
require_relative "../helper"

RSpec.describe UserSerializer do

  it "serializes a user" do
    user = create_user

    data = UserSerializer.new(user).data

    expect(data).to eq({
      id: user.id,
      email: user.email,
      role: user.role,
      created_at: user.created_at.utc.iso8601
    })
  end

end

