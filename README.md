# Jogging Tracker

## Requirements

* User must be able to create an account and log in
* When logged in, user can see, edit and delete his times he entered
* Implement at least three roles with different permission levels: a regular user would only be able to CRUD on their owned records, a user manager would be able to CRUD users, and an admin would be able to CRUD all records and users.
* Each time entry when entered has a date, distance, and time
* When displayed, each time entry has an average speed
* Filter by dates from-to
* Report on average speed & distance per week
* REST API. Make it possible to perform all user actions via the API, including authentication
* In any case you should be able to explain how a REST API works and demonstrate that by creating functional tests that use the REST Layer directly. Please be prepared to use REST clients like Postman, cURL, etc for this purpose.
* All actions need to be done client side using AJAX, refreshing the page is not acceptable.
* Bonus: unit and e2e tests!
* You will not be marked on graphic design, however, do try to keep it as tidy as possible.

## Set Up

#### API
Set up

```
cd server
bundle install
cp config/database.yml.example config/database.yml
cp .env.example .env
```
Make sure to edit `config/database.yml` and `.env` with proper settings.

And then run:
```
make db_create name=jogger_development
make db_migrate env=development
```

To initialize a server in port 9393:
```
make server
```

To initialize a development server that reloads on every request:
```
make dev_server
```

Run the client:
```
npm install
npm start
```

And then you can access the site at `http://localhost:8080`


## Tests

#### API Tests


Set up:
```
cd server
make db_create name=jogger_test
make db_migrate env=test
cp .env.example .env.test
```

Run tests:
```
make test
 ```

#### Client Tests

Set up:
```
npm install
```

Run tests:
```
npm run test
```
