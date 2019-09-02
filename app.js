'use strict';
 /*Se requiere express, body-parser y configuraciones*/
const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const config = require('./version/config');

/*register JSON parser middlewear*/
app.use(bodyParser.json());
 
/*Se requieren carpetas ticketRoutes y versionRoutes*/
// ticketRoutes contiene las rutas que se conectan con los modelos y la BD
// versionRoutes es un una ruta para obtener la versión del config que se está utilizando.
require('./ticket/ticketRoutes')(app);
require('./version/versionRoutes')(app, config); 

/*dotenv ayuda a utilizar variables de entorno*/
require('dotenv').config({path: __dirname + '/.env'});


/*Iniciar server en puerto 3000*/
app.listen(3000, () => {
    console.log("Server is up!");
});
