class SessionSerializer
  def initialize(record)
    @record = record
  end

  def data
    {
      token: AuthToken.issue(user_id: @record.id),
      email: @record.email,
      role: @record.role,
      id: @record.id
    }
  end
end
