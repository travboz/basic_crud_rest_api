// Entry point to our server. 
// We add the `body-parser` middleware.
/* 
 * Middleware functions in web development act as checkpoints between the client and server, intercepting and processing requests and responses as they pass through, allowing for customization, validation, and modification of data flow.
 */

const express = require('express');
const bodyParser = require('body-parser'); // parses incoming request bodies and makes it available as `req.body`. Needed to work with POST requests or any request that sends data to the server in the body, such as form submissions or JSON data.
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// creating a GET route at the root
app.get('/', (request, response) => {
	response.json({info: 'Node.js, Express, and Postgres API'})
});

// Setting CRUD functions in a REST API
// we need to pull the functions created in queries.js into this file, and then make endpoint routes for all of them

// getting the exported functions
const db = require('./queries');

// setting up an endpoint for each function

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

// setting our app to listen on the port above
app.listen(port, () => {
	console.log(`App running on  http://localhost:${port}.`);
});

