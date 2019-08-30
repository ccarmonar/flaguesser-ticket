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
                    aux.push([Number(response.rows[i].id),t])
                }
                this.tickets = new Map(aux)
                // console.log(this.tickets)
                //client.end()
            })
            .catch(err => {
                //client.end()
                console.log(err)
            })



    }
 
    getById(id) {
        console.log(this.tickets.get(id))
        if (this.tickets.get(id) !== undefined){
            return this.tickets.get(id);
        } else {
            return undefined;
        }
    }
 
    getAll() {
        return Array.from(this.tickets.values());
    }
 
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
 
    save(ticket) {
        //this.tickets.set(ticket.id, ticket);
        const query ={
            text: 'INSERT INTO tickets(title, description) VALUES ($1, $2) RETURNING id',
            values: [ticket.title, ticket.description],
            }

        var newTicket = client.query(query)
        var last = client.query('select id from tickets order by id desc limit 1;')
        .then(res => {
            console.log(res.rows[0].id)
            var numberid = res.rows[0].id
            this.tickets.set(numberid, new Ticket(numberid, ticket.title, ticket.description));
            })

            
        return "Ticket Added"
    }
    
}
 
const ticketRepository = new TicketRepository();
 
module.exports = ticketRepository;