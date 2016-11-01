# frozen_string_literal: true
threads 8,16
workers 2
preload_app!

on_worker_boot do
  Sequel::DATABASES.each(&:disconnect)
end
