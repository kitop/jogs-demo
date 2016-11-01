# frozen_string_literal: true
module UserHelpers
  USER_KEY = "app.user"
  HTTP_AUTHORIZATION = "HTTP_AUTHORIZATION"

  def authenticated
    env[USER_KEY] ||= if env[HTTP_AUTHORIZATION]
                        # TODO decode token
                        # token = env[HTTP_AUTHORIZATION][/^Bearer (.*)/, 1]
                      end
  end

  def current_user
    authenticated
  end
end
