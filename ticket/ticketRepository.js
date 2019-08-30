'use strict';
 
const Ticket = require('../ticket/ticket');
const TicketModel = require('../ticket/ticketModel');


const { Client } = require('pg');
const connectionData = {
  user: 'postgres',
  host: '',
  database: 'ticket',
  password: 'password',
  port: 5432,
}


const client = new Client(connectionData)
client.connect()
/*
console.log("holaaaa")
client.query('SELECT * FROM tickets;')
    .then(response => {
        console.log(response.rows)
        client.end()
    })
    .catch(err => {
        client.end()
    })
*/
class TicketRepository {
    constructor() {
        /*
        this.tickets = new Map([
            [1, new Ticket(1, 'Bug1', 'text1')],
            [2, new Ticket(2, 'Bug2', 'text2')],
            [3, new Ticket(3, 'Bug3', 'text3')],
            [4, new Ticket(4, 'Bug4', 'text4')]
        ]);
    
        console.log(this.tickets)
        */    
        var aux = [];
        var allTickets = client.query('SELECT * FROM tickets;')
            .then(response => {
                for (var i in response.rows) {
                    var t = new Ticket(response.rows[i].id,response.rows[i].title,response.rows[i].description)
                    aux.push([Number(i)+1,t])
                }
                this.tickets = new Map(aux)
                // console.log(this.tickets)
                client.end()
            })
            .catch(err => {
                client.end()
            })



    }
 
    getById(id) {
        console.log(this.tickets.get(id))
        return this.tickets.get(id);
    }
 
    getAll() {
        return Array.from(this.tickets.values());
    }
 
    remove() {
        const keys = Array.from(this.tickets.keys());
        this.tickets.delete(keys[keys.length - 1]);
    }
 
    save(ticket) {
        if (this.getById(ticket.id) !== undefined) {
            this.tickets[ticket.id] = ticket;
            return "Updated Ticket with id=" + ticket.id;
        }
        else {
            this.tickets.set(ticket.id, ticket);
            return "Added Ticket with id=" + ticket.id;
        }
    }
}
 
const ticketRepository = new TicketRepository();
 
module.exports = ticketRepository;