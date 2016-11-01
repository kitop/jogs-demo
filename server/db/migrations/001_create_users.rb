Sequel.migration do
  up do
    create_table(:users) do
      primary_key :id
      String :email, null: false
      String :crypted_password, null: false
			Time :created_at, null: false
			Time :updated_at

      index [:email], unique: true
    end
  end

  down do
    drop_table(:users)
  end
end
