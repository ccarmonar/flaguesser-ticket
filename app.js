'use strict';
 
const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
 
// register JSON parser middlewear
app.use(bodyParser.json());
 
require('./src/ticketRoutes')(app);
 
app.listen(3000, () => {
    console.log("Server is up!");
});