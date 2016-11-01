# frozen_string_literal: true
module AuthToken
  def self.issue(payload)
    payload['exp'] ||= (Time.now + 2 * 86400).to_i
    JWT.encode(payload, JWT_SECRET)
  end

  def self.valid?(token)
    JWT.decode(token, JWT_SECRET)
  rescue
    false
  end
end
