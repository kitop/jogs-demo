# frozen_string_literal: true
class Admin < Cuba
  class Users < Cuba
    using Utils::Hash

    def user_params
      attributes = ["email", "password", "password_confirmation"]
      if admin?
        attributes << "role"
      end
      req.params.slice(*attributes)
    end

    define do
      on get, root do
        users = User.all

        json serialize(users)
      end

      on post, root do
        user = User.new(user_params)

        if user.valid?
          user.save
          json serialize(user)
        else
          unprocessable_entity(errors: user.errors.full_messages)
        end
      end

      on get, ":id" do |id|
        user = User[id.to_i]

        if user
          json serialize(user)
        else
          not_found
        end
      end

      on (patch or put), ":id" do |id|
        user = User[id.to_i]

        on user do
          if user.update(user_params)
            json serialize(user)
          else
            unprocessable_entity(errors: user.errors.full_messages)
          end
        end
      end

      on delete, ":id" do |id|
        user = User[id.to_i]

        on user do
          if user.destroy
            no_content
          else
            server_error
          end
        end
      end
    end
  end
end