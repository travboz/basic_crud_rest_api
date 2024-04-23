// Endpoints for CRUD operations

// Creating a pool of active connections - so we don't need to open and close a client each time we make a query

const Pool = require('pg').Pool;
// a good idea to, in a production environment, keep the following config data/values in a separate file 
const pool = new Pool({
	user: 'me', 
	host: 'localhost',
	database: 'api',
	password: 'password',
	port: 5432,
});

// query to get all users from db
const getUsers = (request, response) => {
	pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
}

// GET: get user by a single id
// using the /users/:id route, we'll get the custom id parameter by the URL and use WHERE 
// id=$1, where $1 is a numbered placeholder used by PostgreSQL.

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// POST: add a new user to our db
// We grab `name` and `email` from request body and insert it into our db with INSERT operation
const createUser = (request, response) => {
	const { name, email } = request.body;

	pool.query('INSERT INTO users(name, email) VALUES($1, $2) RETURNING *', [name, email], (error, results) => {
		if (error) {
			throw error;
		}
		// 201 is successfully created
		response.status(201).send(`User added with ID: ${results.rows[0].id}`);
	});
}

// PUT: update an existing user
// /users/:id will be used for GETting a user with id, and also PUTting to modify an existing user.

const updateUser = (request, response) => {
	const id = parseInt(request.params.id);
	const { name, email } = request.body;

	pool.query(
		'UPDATE users SET name = $1, email = $2 WHERE id = $3',
		[name, email, id],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).send(`User modifed with ID; ${id}`);
		}
	);
}

// Deleting a user
// we'll use /users/:id to delete a specific user by id.

const deleteUser = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query(
		'DELETE FROM users WHERE id = $1',
		[id],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).send(`User deleted with ID: ${id}`);
		});
}

// Exporting the CRUD functions
module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}
