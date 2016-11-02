Sequel.migration do
  change do
    extension :pg_enum
    create_enum(:role, %w{ user admin user_manager })
    alter_table(:users) do
      add_column :role, "role", null: false, default: "user"
    end
  end
end
