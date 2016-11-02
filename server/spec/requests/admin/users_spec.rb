# frozen_string_literal: true
require_relative "../../helper"

RSpec.describe Admin::Users do
  context "user" do
    it "cannot access the admin area" do
      user = create_user

      get_as user, "/admin/users"

      expect_response 404
      expect(response_json).to eq nil
    end
  end

  context "admin" do
    let(:admin) { create_admin }

    it "lists users" do
      users = [create_user, create_user, admin]

      get_as admin, "/admin/users"

      expect_response 200
      expect(response_json).to eq serialize(users)
    end

    it "creates a user" do
      post_as admin, "/admin/users", {
        email: "foo@foo.com",
        password: "pass123",
        password_confirmation: "pass123",
        role: "user"
      }

      user = User.users.last

      expect_response 200
      expect(response_json).to eq serialize(user)
      expect(User.users.count).to eq 1
      expect(user.values).to include(email: "foo@foo.com", role: "user")
    end

    it "shows user" do
      user = create_user

      get_as admin, "/admin/users/#{user.id}"

      expect_response 200
      expect(response_json).to eq serialize(user)
    end

    it "edits user" do
      user = create_user

      put_as admin, "/admin/users/#{user.id}", { email: "bar@bar.com" }

      user.set(email: "bar@bar.com")
      expect_response 200
      expect(response_json).to eq serialize(user)
    end

    it "deletes user" do
      user = create_user

      delete_as admin, "/admin/users/#{user.id}"

      expect_response 204
      expect{ user.reload }.to raise_error(Sequel::NoExistingObject)
    end
  end

  context "user manager" do
    let(:manager) { create_user_manager }

    it "can access users" do
      users = [create_user, create_user, manager]

      get_as manager, "/admin/users"

      expect_response 200
      expect(response_json).to eq serialize(users)
    end
  end
end
