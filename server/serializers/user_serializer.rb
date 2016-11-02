class UserSerializer
  def initialize(record)
    @record = record
  end

  def data
    {
      id: @record.id,
      email: @record.email,
      role: @record.role,
      created_at: @record.created_at.utc.iso8601
    }
  end
end
