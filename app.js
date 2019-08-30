'use strict';
 
const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const config = require('./version/config');

// register JSON parser middlewear
app.use(bodyParser.json());
 
require('./ticket/ticketRoutes')(app);
require('./version/versionRoutes')(app, config); 

/*
const { Client } = require('pg');
const connectionData = {
  user: 'postgres',
  host: '',
  database: 'ticket',
  password: 'password',
  port: 5432,
}
*/
app.listen(3000, () => {
    console.log("Server is up!");

});