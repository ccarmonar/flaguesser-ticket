'use strict';
const assert = require('chai').assert;
const app = require('../app');


let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

const test_jsonTicket = JSON.parse('{"title": "title test", "description": "description test"}');
const test_jsonNoTicket = JSON.parse('{"error": "error test", "error_description": "error"}');


/*Conexión con la BD */
const { Client } = require('pg');
const connectionData = {
  user: process.env['DB_USER'] || 'postgres',
  host: process.env['DB_HOST'] || 'localhost',
  database: process.env['DB_NAME'] || 'ticket',
  password: process.env['DB_PASS'] || 'password',
  port: process.env['DB_PORT'] || 5432,
}
const client = new Client(connectionData)
client.connect()

describe('Ticket test - create', function(){
	it('Create new ticket test', function(){
		console.log(test_jsonTicket);
		chai.request(url)
		 .post('/save')
		 .send(test_jsonTicket)
		 .end( function(err,res){
	        expect(res).to.have.status(200);
	        done();
	      })
	});

	it('No create fake tickets', function(){
		console.log(test_jsonNoTicket);
		chai.request(url)
		 .post('/save')
		 .send(test_jsonNoTicket)
		 .end( function(err,res){
	        expect(res).to.have.status(200);
	        done();
	      })
	});
});


describe('Ticket test - obtain', function(){
	it('Obtain all tickets', (done) => {
		chai.request(url)
			.get('/all')
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Get last ticket', (done) => {
		var last = client.query('select id from tickets order by id desc limit 1;')
		 .then(re => {
			var numberid = Number(re.rows[0].id)
			var get = '/get/'+numberid;
			chai.request(url)
			  .get(get)
			  .end(function(err,res){
				expect(res.body).to.have.property('id').to.be.equal(numberid);
				expect(res).to.have.status(200);
				done();
			});
		});
	});

});
