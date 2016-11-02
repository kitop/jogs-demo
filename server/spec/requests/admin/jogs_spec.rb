# frozen_string_literal: true
require_relative "../../helper"

RSpec.describe Admin::Jogs do
  context "jog" do
    it "cannot access the admin area" do
      user = create_user

      get_as user, "/admin/jogs"

      expect_response 404
      expect(response_json).to eq nil
    end
  end

  context "user manager" do
    let(:manager) { create_user_manager }

    it "cannot admin jogs" do
      get_as manager, "/admin/jogs"

      expect_response 404
      expect(response_json).to eq nil
    end
  end

  context "admin" do
    let(:admin) { create_admin }

    it "lists jogs" do
      jogs = [create_jog, create_jog]

      get_as admin, "/admin/jogs"

      expect_response 200
      expect(response_json).to eq serialize(jogs)
    end

    it "creates a jog" do
      date = Date.today
      post_as admin, "/admin/jogs", {
        user_id: 1,
        date: date.iso8601,
        distance: 4000,
        duration: 30 * 60
      }

      jog = Jog.last

      expect_response 200
      expect(response_json).to eq serialize(jog)
      expect(Jog.count).to eq 1
      expect(jog.values).to include(date: date, distance: 4000, duration: 30*60)
    end

    it "shows jog" do
      jog = create_jog

      get_as admin, "/admin/jogs/#{jog.id}"

      expect_response 200
      expect(response_json).to eq serialize(jog)
    end

    it "edits jog" do
      jog = create_jog

      put_as admin, "/admin/jogs/#{jog.id}", { distance: 200 }

      jog.set(distance: 200)
      expect_response 200
      expect(response_json).to eq serialize(jog)
    end

    it "deletes jog" do
      jog = create_jog

      delete_as admin, "/admin/jogs/#{jog.id}"

      expect_response 204
      expect{ jog.reload }.to raise_error(Sequel::NoExistingObject)
    end
  end
end

