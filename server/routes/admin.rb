# frozen_string_literal: true
class Admin < Cuba
  define do
    on "users", (admin? or user_manager?) do
      run Admin::Users
    end

    on "jogs", admin? do
      run Admin::Jogs
    end
  end
end
