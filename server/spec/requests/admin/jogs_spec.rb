# frozen_string_literal: true
require_relative "../../helper"

RSpec.describe "Admin/Jogs" do
  let(:jog) { create_jog }
  let(:jogs_params) { {
      date: Date.today.iso8601,
      distance: 5000,
      duration: 30 * 60
  } }
  jogs_routes = {
    get: %w{ /admin/users/%d/jogs /admin/users/%d/jogs/%d },
    post: %w{ /admin/users/jogs },
    put: %w{ /admin/users/%d/jogs/%d },
    delete: %w{ /admin/users/%d/jogs/%d }
  }

  context "user" do
    let(:user) { create_user }

    jogs_routes.each do |method, routes|
      routes.each do |route|
        it "cannot access the admin jogs area - #{route}" do
          processed_route = (route % [jog.user_id, jog.id])
          params = {}
          if method == :put or method == :post
            params = jogs_params
          end

          send("#{method}_as", user, processed_route, params)

          expect_response 404
          expect(response_json).to eq nil
        end
      end
    end
  end

  context "user manager" do
    let(:user_manager) { create_user_manager}

    jogs_routes.each do |method, routes|
      routes.each do |route|
        it "cannot access the admin jogs area - #{route}" do
          processed_route = (route % [jog.user_id, jog.id])
          params = {}
          if method == :put or method == :post
            params = jogs_params
          end

          send("#{method}_as", user_manager, processed_route, params)

          expect_response 404
          expect(response_json).to eq nil
        end
      end
    end
  end

  context "admin" do
    let(:admin) { create_admin }
    let(:user) { create_user }

    it "lists jogs" do
      jogs = [create_jog(user_id: user.id), create_jog(user_id: user.id)]

      get_as admin, "/admin/users/#{user.id}/jogs"

      expect_response 200
      expect(response_json).to eq serialize(jogs)
    end

    it "creates a jog" do
      date = Date.today
      post_as admin, "/admin/users/#{user.id}/jogs", {
        date: date.iso8601,
        distance: 4000,
        duration: 30 * 60
      }

      jog = Jog.last

      expect_response 200
      expect(response_json).to eq serialize(jog)
      expect(user.jogs.count).to eq 1
      expect(jog.values).to include(date: date, distance: 4000, duration: 30*60)
    end

    it "shows jog" do
      jog = create_jog(user_id: user.id)

      get_as admin, "/admin/users/#{user.id}/jogs/#{jog.id}"

      expect_response 200
      expect(response_json).to eq serialize(jog)
    end

    it "edits jog" do
      jog = create_jog(user_id: user.id)

      put_as admin, "/admin/users/#{user.id}/jogs/#{jog.id}", { distance: 200 }

      jog.reload
      expect(jog.distance).to eq 200
      expect_response 200
      expect(response_json).to eq serialize(jog)
    end

    it "deletes jog" do
      jog = create_jog(user_id: user.id)

      delete_as admin, "/admin/users/#{user.id}/jogs/#{jog.id}"

      expect_response 204
      expect{ jog.reload }.to raise_error(Sequel::NoExistingObject)
    end
  end
end

