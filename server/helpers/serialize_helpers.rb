# frozen_string_literal: true
module SerializeHelpers
  def serialize(record_or_records)
    if record_or_records.is_a? Array
      serialize_array(record_or_records)
    else
      serialize_single(record_or_records)
    end
  end

  def serialize_array(records)
    records.map { |record| serialize_single(record) }
  end

  def serialize_single(record)
    serializer_klass = Object.const_get("#{record.class}Serializer")

    serializer_klass.new(record).data
  end
end
