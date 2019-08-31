'use strict';
/*Conexión con la BD*/
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
	process.env['DATABASE_NAME'] || 'ticket', 
	process.env['DATABASE_USER'] || 'postgres', 
	process.env['DATABASE_PASS'] || 'password', {
  host: process.env['DATABASE_HOST'] || 'localhost',
  dialect: 'postgres'
});

/*Se crea tabla de ticket en la BD si no existe */
class TicketModel extends Sequelize.Model {}
	TicketModel.init({
	  title: Sequelize.STRING,
	  description: Sequelize.STRING,
	}, { sequelize, modelName: 'tickets', timestamps: false});

sequelize.sync();
