# frozen_string_literal: true
module RouteHelpers
  def json(object = nil)
    res.headers.merge! Rack::CONTENT_TYPE => "application/json"
    result = block_given? ? yield : object
    res.write Oj.dump(result, mode: :compat)
  end

  def no_content
    finish 204
  end

  def unauthorized(body = nil)
    finish 401, body
  end

  def forbidden(body = nil)
    finish 403, body
  end

  def not_found(body = nil)
    finish 404, body
  end

  def unprocessable_entity(body = nil)
    finish 422, body
  end

  def finish(status = 200, body = nil)
    res.status = status
    json(body) if body
    halt res.finish
  end
end
