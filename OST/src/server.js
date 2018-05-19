const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const password = ; //REDACTED for GITHUB
const connectionString = 'postgresql://ost:' + password + '@ost-poc.cmsffmdasle7.us-east-1.rds.amazonaws.com:5432/ost';
const app = express();

app.use(bodyParser.json());
app.listen(8000, () => {
	console.log('Server started!');
});

app.route('/api/jobs/all').get((req, res) => {
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
				return res.status(200).send("Job " + requestedJob + " Deleted")
			}
		});
	});
});
