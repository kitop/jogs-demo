.PHONY: test dev_server server console

test:
	env RACK_ENV=test $$(cat .env.test) rspec spec --color --order rand

dev_server:
	env $$(cat .env) shotgun -o 0.0.0.0 --server=webrick

server:
	env $$(cat .env) puma -C config/puma.rb -b tcp://0.0.0.0:9393

console:
	env $$(cat .env) irb -r ./app

db_create:
	createdb -E UTF8 -e ${name}

db_migrate:
	sequel -m db/migrations -e ${env} -E config/database.yml
