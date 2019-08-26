'use strict';
 
const Router = require('express');
const ticketRepo = require('../ticket/ticketRepository');
 
const getTicketRoutes = (app) => {
    const router = new Router();
 
    router
        .get('/get/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const result = ticketRepo.getById(id);
            res.send(result);
        })
        .get('/all', (req, res) => {
            const result = ticketRepo.getAll();
            res.send(result);
        })
        .get('/remove', (req, res) => {
            ticketRepo.remove();
            const result = 'Last ticket remove. Total count: '
                + ticketRepo.tickets.size;
            res.send(result);
        })
        .post('/save', (req, res) => {
            const ticket = req.body;
            const result = ticketRepo.save(ticket);
            res.send(result);
        });
 
    app.use('/ticket', router);
};
 
module.exports = getTicketRoutes;