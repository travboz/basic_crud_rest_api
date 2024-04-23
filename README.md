# RESTful CRUD API built with Node.js, Express, and PostgreSQL
This repository contains the code for a basic CRUD API used to query a PostgreSQL database.

## Dependencies
- [Nodejs](https://nodejs.org/en/)
- [Express](https://www.npmjs.com/package/express)
- [node-postgres](https://www.npmjs.com/package/pg)

## Installation
- Clone this repo: 
`git clone https://github.com/travboz/basic_crud_rest_api.git`.

- Navigate into the project directory: 
`cd restful_crud_api`.

- Install dependencies: 
`npm i`.

- Run the following command to see the output of each file:
`node index.js`.

- Navigate to the url that the server is running on and use [Postman](https://www.postman.com/) to interact with the API.

| HTTP Method | Endpoint | Relevant Function |
| -- | -- | -- |
|GET| / | displayHome() |
|GET| /users | getUsers() |
|GET| /users/:id | getUserById() |
|POST| /users | createUser() |
|PUT| /users/:id | updateUser() |
|DELETE| /users/:id | deleteUser() |

### When using the `POST` or `PUT` routes to create a user or update a user, the following request bodies are included:
For the `POST` route of `/users` to create a new user we need to pass some `json` with the request. 
```JavaScript
{
    "name": "new",
    "email": "new_user@example.com"
}
```

For the `PUT` route of `/users/:id` to update a user's information, we must also provide `json` with the request.
```JavaScript
{
    "name": "Paul",
    "email": "p@example.com"
}
```
This must be `PUT` to a valid user, for example `/users/1`.

These will return logged outputs reporting of a successful query.
