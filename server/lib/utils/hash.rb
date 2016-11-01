# adds some refinements to the Hash class
module Utils
  module Hash
    refine ::Hash do
      def slice(*keys)
        keys.each_with_object(self.class.new) { |k, hash| hash[k] = self[k] if has_key?(k) }
      end
    end
  end
end
