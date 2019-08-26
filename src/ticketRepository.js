'use strict';
 
const Ticket = require('../src/ticket');
 
class TicketRepository {
    constructor() {
        this.tickets = new Map([
            [1, new Ticket(1, 'Bug1', 'text1')],
            [2, new Ticket(2, 'Bug2', 'text2')],
            [3, new Ticket(3, 'Bug3', 'text3')],
            [4, new Ticket(4, 'Bug4', 'text4')]
        ]);
    }
 
    getById(id) {
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