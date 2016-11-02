# frozen_string_literal: true
module AuthToken
  def self.issue(payload)
    payload['exp'] ||= (Time.now + 2 * 86400).to_i
    JWT.encode(payload, JWT_SECRET)
  end

  def self.decode(token)
    JWT.decode(token, JWT_SECRET)[0]
  end

  def self.valid?(token)
    decode(token)
  rescue JWT::DecodeError
    false
  end
end
