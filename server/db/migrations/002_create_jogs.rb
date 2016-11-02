Sequel.migration do
  up do
    create_table(:jogs) do
      primary_key :id
      Integer :user_id,   null: false
      Date :date,         null: false
      Integer :distance,  null: false
      Integer :time,      null: false
			Time :created_at,   null: false
			Time :updated_at

      index [:user_id]
    end
  end

  down do
    drop_table(:jogs)
  end
end

