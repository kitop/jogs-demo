Sequel.migration do
  up do
    alter_table(:jogs) do
      rename_column :time, :duration
    end
  end

  down do
    alter_table(:jogs) do
      rename_column :duration, :time
    end
  end
end
