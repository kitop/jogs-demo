# frozen_string_literal: true
module TestHelpers
  module Response

    def expect_response status
      expect(last_response.status).to eq status
    end

    def expect_empty_response
      expect(last_response.body).to be_empty
    end

    def response_json
      parse_json(last_response.body)
    end

  end
end
