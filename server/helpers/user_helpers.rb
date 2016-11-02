# frozen_string_literal: true
module UserHelpers
  USER_KEY = "app.user"
  HTTP_AUTHORIZATION = "HTTP_AUTHORIZATION"

  def authenticated
    env[USER_KEY] ||= if env[HTTP_AUTHORIZATION]
                        token = env[HTTP_AUTHORIZATION][/^Bearer (.*)/, 1]
                        if AuthToken.valid?(token)
                          user_id = AuthToken.decode(token)["user_id"]
                          User[user_id.to_i]
                        end
                      end
  end

  def current_user
    authenticated
  end
end
