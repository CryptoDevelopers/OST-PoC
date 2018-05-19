const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const password = ''; //REDACTED for GITHUB
const connectionString = 'postgresql://ost:' + password + '@ost-poc.cmsffmdasle7.us-east-1.rds.amazonaws.com:5432/ost';
const app = express();

app.use(bodyParser.json());
app.listen(8000, () => {
	console.log('Server started!');
});

// JOBS ----------------------------------------------------------------------
app.route('/api/jobs/all').get((req, res) => {
	console.log('Getting all jobs');
	const results = [];
	// Get a Postgres client from the connection pool
	pg.connect(connectionString, (err, client, done) => {
		// Handle connection errors
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}
		// SQL Query > Select Data
		const query = client.query('SELECT * FROM jobs;');
		// Stream results back one row at a time
		query.on('row', (row) => {
			results.push(row);
		});
		// After all data is returned, close connection and return results
		query.on('end', () => {
			done();
			return res.json(results);
		});
	});
});

app.route('/api/jobs/:job_id').get((req, res) => {
	const requestedJob = req.params['job_id']
	console.log('Getting job ' + requestedJob);
	const results = [];
	// Get a Postgres client from the connection pool
	pg.connect(connectionString, (err, client, done) => {
		// Handle connection errors
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}
		// SQL Query > Select Data
		const query = client.query('SELECT * FROM jobs WHERE job_id = '.concat(requestedJob), function (err, result) {
			if (err) {
				return res.status(400).send(err.detail)
			}
		});
		// Stream results back one row at a time
		query.on('row', (row) => {
			results.push(row);
		});
		// After all data is returned, close connection and return results
		query.on('end', () => {
			done();
			if (results.length == 0) {
				return res.status(400).send("Job doesn't exist")
			}
			else {
				return res.json(results);
			}
		});
	});
});

app.route('/api/jobs/new').post((req, res) => {
	console.log('Creating new job');
	// Grab data from http request
  const data = {job_id: req.body.job_id, title: req.body.title, description: req.body.description, skills: req.body.skills, pay: req.body.pay, date_posted: req.body.date_posted, username: req.body.username};
	// Get a Postgres client from the connection pool
	pg.connect(connectionString, (err, client, done) => {
		// Handle connection errors
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		// SQL Query > Insert Data
		const query = client.query('INSERT INTO jobs(job_id, title, description, skills, pay, date_posted, username) values($1, $2, $3, $4, $5, $6, $7)', [data.job_id, data.title, data.description, data.skills, data.pay, data.date_posted, data.username], function (err, result) {
			if (err) {
				return res.status(400).send(err.detail)
			}
			else{
				return res.status(201).send(req.body)
			}
		});
		// Close connection
		query.on('end', () => {
			done();
		});
	});
});

app.route('/api/jobs/delete/:job_id').delete((req, res) => {
	const requestedJob = req.params['job_id'];
	console.log('Deleting job ' + requestedJob);
	const results = [];
	// Get a Postgres client from the connection pool
	pg.connect(connectionString, (err, client, done) => {
		// Handle connection errors
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}
		// Check to see if job exists
		const query = client.query('SELECT * FROM jobs WHERE job_id = '.concat(requestedJob), function (err, result) {
			if (err) {
				return res.status(400).send(err.detail)
			}
		});

		// Stream results back one row at a time
		query.on('row', (row) => {
			results.push(row);
		});

		// Close connection
		query.on('end', () => {
			done();
			if (results.length == 0) {
				return res.status(400).send("Job " + requestedJob + " doesn't exist")
			}
			else{
				// SQL Query > Delete Data
				client.query('DELETE FROM jobs WHERE job_id = '.concat(requestedJob));
				return res.status(200).send("Job " + requestedJob + " deleted")
			}
		});
	});
});

// USERS ----------------------------------------------------------------------
app.route('/users/:username').get((req, res) => {
	const requestedUser = req.params['username'];
	console.log('Getting user ' + requestedUser);
	const results = [];
	// Get a Postgres client from the connection pool
	pg.connect(connectionString, (err, client, done) => {
		// Handle connection errors
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}
		// SQL Query > Select Data
		const query = client.query("SELECT * FROM users WHERE username = '" + requestedUser + "'" , function (err, result) {
			if (err) {
				console.log(err);
				return res.status(400).send(err.detail)
			}
		});
		// Stream results back one row at a time
		query.on('row', (row) => {
			results.push(row);
		});
		// After all data is returned, close connection and return results
		query.on('end', () => {
			done();
			if (results.length == 0) {
				return res.status(400).send("User doesn't exist")
			}
			else {
				return res.json(results);
			}
		});
	});
});

app.route('/users/new').post((req, res) => {
	console.log('Creating new user ');
	// Grab data from http request
  const data = {user_id: req.body.user_id, username: req.body.username, password: req.body.password, first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, linkedin_url: req.body.linkedin_url, skills: req.body.skills};
	// Get a Postgres client from the connection pool
	pg.connect(connectionString, (err, client, done) => {
		// Handle connection errors
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		// SQL Query > Insert Data
		const query = client.query('INSERT INTO users(user_id, username, password, first_name, last_name, email, linkedin_url, skills) values($1, $2, $3, $4, $5, $6, $7, $8)', [data.user_id, data.username, data.password, data.first_name, data.last_name, data.email, data.linkedin_url, req.body.skills], function (err, result) {
			if (err) {
				return res.status(400).send(err.detail)
			}
			else{
				return res.status(201).send(req.body)
			}
		});
		// Close connection
		query.on('end', () => {
			done();
		});
	});
});

app.route('/users/delete/:username').delete((req, res) => {
	const requestedUser = req.params['username'];
	console.log('Deleting user ' + requestedUser);
	const results = [];
	// Get a Postgres client from the connection pool
	pg.connect(connectionString, (err, client, done) => {
		// Handle connection errors
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}
		// Check to see if user exists
		const query = client.query("SELECT * FROM users WHERE username = '" + requestedUser + "'", function (err, result) {
			if (err) {
				return res.status(400).send(err.detail)
			}
		});

		// Stream results back one row at a time
		query.on('row', (row) => {
			results.push(row);
		});

		// Close connection
		query.on('end', () => {
			done();
			if (results.length == 0) {
				return res.status(400).send("User " + requestedUser + " doesn't exist")
			}
			else{
				// SQL Query > Delete Data
				client.query("DELETE FROM users WHERE username = '" + requestedUser + "'");
				return res.status(200).send("User " + requestedUser + " deleted")
			}
		});
	});
});
