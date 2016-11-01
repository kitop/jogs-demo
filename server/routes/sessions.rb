# frozen_string_literal: true
class Sessions < Cuba
  define do
    on post, root do
      user = User.authenticate(req.params["email"], req.params["password"])

      if user
        json token: AuthToken.issue(user_id: user.id)
      else
        unauthorized errors: ["invalid credentials"]
      end
    end
  end
end
