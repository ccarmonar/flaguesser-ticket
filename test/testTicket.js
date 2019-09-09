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

describe('Ticket test - GET', function(){
	it('Obtener todo los tickets', (done) => {
		chai.request(url)
			.get('/all')
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Obtener ticket id 2', (done) => {
		chai.request(url)
			.get('/get/2')
			.end( function(err,res){
				expect(res.body).to.have.property('id').to.be.equal('2')
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('Ticket test - POST', function(){
	it('Crear ticket valido', function(){
		chai.request(url)
		 .post('/save')
		 .send(test_jsonTicket)
		 .end( function(err,res){
	        expect(res).to.have.status(200);
	        done();
	      })
	});

	it('No crear ticket invalido', function(){
		chai.request(url)
		 .post('/save')
		 .send(test_jsonNoTicket)
		 .end( function(err,res){
	        expect(res).to.have.status(200);
	        done();
	      })
	});

});



const test_jsonSQLInjection = JSON.parse('{"title": "SQL Injection TEST", "description": "SQL Injection)'+ "'"  +'; DROP TABLE tickets;"}');

describe('SQL Injection - TEST', function(){
	it('Crear ticket evitando el SQL Injection', function(){
		//console.log("Se esta tratando de insertar:");
		//console.log(test_jsonSQLInjection);
		chai.request(url)
		 .post('/save')
		 .send(test_jsonSQLInjection)
		 .end( function(err,res){
	        expect(res).to.have.status(200);
	        done();
	      })
		 //console.log("node.js cambia automaticamente las coma por slash coma, lo que evita SQL Injection")
	});
	it('Crear nuevamente ticket', function(){
		chai.request(url)
		 .post('/save')
		 .send(test_jsonTicket)
		 .end( function(err,res){
	        expect(res).to.have.status(200);
	        done();
	      })
	});

});