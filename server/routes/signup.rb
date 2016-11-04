# frozen_string_literal: true
class Signup < Cuba
  using Utils::Hash

  define do
    on post, root do
      user_params = req.params.slice("email", "password", "password_confirmation")
      user = User.new(user_params)

      if user.valid?
        user.save
        json serialize(user, SessionSerializer)
      else
        unprocessable_entity({ errors: user.errors.full_messages })
      end
    end
  end
end
