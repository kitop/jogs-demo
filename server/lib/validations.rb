module Validations
  def validate_presence_of(*attributes)
    attributes.each do |attribute|
      value = send(attribute)
      if value.nil? or (value.respond_to?(:empty?) and value.empty?)
        errors.add(attribute, "can't be empty")
      end
    end
  end

  def validate_greater_than(value, *attributes)
    attributes.each do |attribute|
      value = send(attribute)
      if value and value < 1
        errors.add(attribute, "has to be greater than 0")
      end
    end
  end
end
