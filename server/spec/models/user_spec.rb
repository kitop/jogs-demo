# frozen_string_literal: true
require_relative "../helper"

RSpec.describe User do
  context "validations" do
    it "validates password is present" do
      user = User.new(email: "test@test.com",
                      password: "",
                      password_confirmation: "")

      expect(user.valid?).to be_falsey
      expect(user.errors[:password]).to include "can't be empty"
    end

    it "validates password confirmation" do
      user = User.new(email: "test@test.com",
                      password: "pass123",
                      password_confirmation: "pass456")

      expect(user.valid?).to be_falsey
      expect(user.errors[:password]).to include "doesn't match confirmation"
    end

    it "is valid with proper password" do
      user = User.new(email: "test@test.com",
                      password: "pass123",
                      password_confirmation: "pass123")

      expect(user.valid?).to be_truthy
    end

    it "validates email format" do
      user = User.new(email: "notanemail")

      expect(user.valid?).to be_falsey
      expect(user.errors[:email]).to include "is not valid"
    end

    it "validates email uniqueness" do
      User.create(email: "test@test.com", password: "pass123", password_confirmation: "pass123")
      user = User.new(email: "test@test.com", password: "pass456", password_confirmation: "pass456")

      expect(user.valid?).to be_falsey
      expect(user.errors[:email]).to include "already exists"
    end
  end

  describe "role" do
    it "defaults to user" do
      user = build_user(role: nil)
      user.save

      expect(user.role).to eq "user"
    end
  end
end
