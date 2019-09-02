'use strict';
/*Conexión con la BD*/
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
	process.env['DB_NAME'] || 'ticket', 
	process.env['DB_USER'] || 'postgres', 
	process.env['DB_PASS'] || 'password', {
  host: process.env['DB_HOST'] || 'localhost',
  dialect: 'postgres',
  logging: false
});

/*Se crea tabla de ticket en la BD si no existe */
class TicketModel extends Sequelize.Model {}
	TicketModel.init({
	  title: Sequelize.STRING,
	  description: Sequelize.STRING,
	}, 
	{ sequelize, 
		modelName: 'tickets', 
		logging: false, 
		timestamps: false
	});

sequelize.sync();
