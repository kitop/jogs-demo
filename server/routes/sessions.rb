# frozen_string_literal: true
class Sessions < Cuba
  define do
    on post, root do
      user = User.authenticate(req.params["email"], req.params["password"])

      if user
        json serialize(user, SessionSerializer)
      else
        unauthorized errors: ["Invalid email and/or password."]
      end
    end
  end
end
