const Sequelize = require('sequelize');
const sequelize = new Sequelize('ticket', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


class TicketModel extends Sequelize.Model {}
	TicketModel.init({
	  title: Sequelize.STRING,
	  description: Sequelize.STRING,
	}, { sequelize, modelName: 'ticket', timestamps: false});

	/*
	sequelize.sync()
	  .then(() => TicketModel.create({
	    title: 'Bug 1',
	    description: 'New Ticket',
	  }))
	  .then(jane => {
	    console.log(jane.toJSON());
	});
	*/
	
