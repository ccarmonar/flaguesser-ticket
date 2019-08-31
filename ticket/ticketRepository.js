'use strict';
 
 /*Se llama a las clases Ticket y TicketModel para hacer el repositorio y construir la BD respectivamente (si no existe)*/
const Ticket = require('../ticket/ticket');
const TicketModel = require('../ticket/ticketModel');


/*Conexión con la BD */
const { Client } = require('pg');
const connectionData = {
  user: process.env['DATABASE_USER'] || 'postgres',
  host: process.env['DATABASE_HOST'] || 'localhost',
  database: process.env['DATABASE_NAME'] || 'ticket',
  password: process.env['DATABASE_PASS'] || 'password',
  port: process.env['DATABASE_PORT'] || 5432,
}
const client = new Client(connectionData)
client.connect()


/*Repositorio de Tickets*/

class TicketRepository {

    /*Constructor del repositorio*/
    constructor() {
        var aux = [];
        var allTickets = client.query('SELECT * FROM tickets;')
            .then(response => {
                for (var i in response.rows) {
                    var t = new Ticket(response.rows[i].id,response.rows[i].title,response.rows[i].description)
                    aux.push([Number(response.rows[i].id),t])
                }
                this.tickets = new Map(aux)
            })
            .catch(err => {
                console.log(err)
            })
    }
 
    /*Obtener un ticket por id*/
    getById(id) {
        console.log(this.tickets.get(id))
        if (this.tickets.get(id) !== undefined){
            return this.tickets.get(id);
        } else {
            return undefined;
        }
    }
    /*Obtener todo los tickets*/
    getAll() {
        return Array.from(this.tickets.values());
    }
 
    /*Eliminar un ticket: Se elimina en la BD y en el repositorio. Si ticket no existe, retorna comunicando el mensaje.*/
    remove(id) {
        if (this.getById(id) !== undefined){
            const query = {
                text: 'DELETE FROM tickets WHERE id=($1)',
                values: [id],
            }            
            var deteleTicket = client.query(query)
             .then(res => {
                this.tickets.delete(id);
                })
             .catch(err => {
                    console.log(err)
                })
             return "Ticket deleted";
        } else {
            return "Ticket Don't Exist";
        }



    }
 
    /*Crear un ticket: Se crea en la BD y en el repositorio*/
    save(ticket) {
        const query ={
            text: 'INSERT INTO tickets(title, description) VALUES ($1, $2) RETURNING id',
            values: [ticket.title, ticket.description],
            }

        var newTicket = client.query(query)
        var last = client.query('select id from tickets order by id desc limit 1;')
        .then(res => {
            console.log(res.rows[0].id)
            var numberid = res.rows[0].id
            /*Si no existe nada en la BD, al crear el primer ticket también se crea el repositorio*/
            if (this.tickets !== undefined) {
                this.tickets.set(numberid, new Ticket(numberid, ticket.title, ticket.description));
            } else {
                var aux = [];
                var allTickets = client.query('SELECT * FROM tickets;')
                    .then(response => {
                        for (var i in response.rows) {
                            var t = new Ticket(response.rows[i].id,response.rows[i].title,response.rows[i].description)
                            aux.push([Number(response.rows[i].id),t])
                        }
                        this.tickets = new Map(aux)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            })

            
        return "Ticket Added"
    }
    
}
 
 /*Exportamos el repositorio*/
const ticketRepository = new TicketRepository();
module.exports = ticketRepository;