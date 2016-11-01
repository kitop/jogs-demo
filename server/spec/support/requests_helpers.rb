# frozen_string_literal: true
module TestHelpers
  module Requests
    def get_as user, path, params = {}
      request_as user, :get, path, params
    end

    def post_as user, path, params = {}
      request_as user, :post, path, params
    end

    def post_with_multipart_as user, path, params = {}
      header "Authorization", "token #{user.jingleplayer_token}"
      post path, params
    end

    def delete_as user, path, params = {}
      request_as user, :delete, path, params
    end

    def put_as user, path, params = {}
      request_as user, :put, path, params
    end

    def request_as user, method, path, params = {}
      # TODO set proper header
      header "Authorization", "Bearer #{user.id}"
      unless method == :get or params.empty?
        header "Content-Type", "application/json"
        params = Oj.dump(params, mode: :compat)
      end
      send method, path, params
    end
  end
end
