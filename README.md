# Tech Stack

Front-end:
- Vue
- Typescript
- Sass
- Jest
- Cypress

Back-end:
- Express.js
- PostgreSQL

# Prequisites

Requirements

- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/downloads)

*Optional*

- [PostgreSQL +17](https://www.postgresql.org/download/)

# Development Setup

To install the node modules
`npm install --prefix ./api`
`npm install --prefix ./client`

To start the db

`psql -U postgres -f init.sql`

To connect to the db

`psql -U postgres -d feirahelio`

To run the project

`docker compose up --watch`

To stop the project

`docker compose down`
