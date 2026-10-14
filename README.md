# Node Api

This is a Node.js API running Fastify, Knex, and MySQL. It contains CRUD routes for managing `Employees`, `Titles`, and `Salaries`.

## Instructions for Running

1. Ensure Node.js v24 and Yarn v1 are installed.
2. `yarn install`
3. Copy `.env.template` to `.env` and adjust values accordingly.
4. Ensure Docker is installed and running.
5. `yarn db:start`
6. `yarn dev` will start the API locally.

## Technology Used

### Fastify

- This API uses the Fastify framework. You can find the documentation [here](https://fastify.dev/docs/latest/).

### Knex.js

- This API uses Knex.js to build and execute queries against the MySQL Database. Documentation can be found [here](https://knexjs.org/).

### MySQL Database

- The database for this API is a MySQL database, version 5.7. Documentation can be found [here](https://dev.mysql.com/doc/refman/5.7/en/).
  Documentation for the docker container containing the database can be found [here](https://hub.docker.com/r/genschsa/mysql-employees).

#### Database Schema

The database for this API is using the sample MySQL employees database. The schema for this database can be found [here](https://dev.mysql.com/doc/employee/en/sakila-structure.html)
