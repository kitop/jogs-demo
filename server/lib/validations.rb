module Validations
  def validate_presence_of(*attributes)
    attributes.each do |attribute|
      value = send(attribute)
      if value.nil? or (value.respond_to?(:empty?) and value.empty?)
        errors.add(attribute, "can't be empty")
      end
    end
  end
end
