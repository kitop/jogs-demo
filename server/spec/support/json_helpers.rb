# frozen_string_literal: true
module TestHelpers
  module JSON
    # helpers
    def json(obj)
      Oj.dump(obj, mode: :compat)
    end

    def parse_json(str)
      Oj.load(str, symbol_keys: true)
    end
  end
end
