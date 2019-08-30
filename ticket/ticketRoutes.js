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
        .delete('/remove/:id', (req, res) => {
            const id = parseInt(req.params.id);
            //ticketRepo.remove(id);
            const result = ticketRepo.remove(id);
            res.send(result);
        })
        .post('/save', (req, res) => {
            const ticket = req.body;
            const result = ticketRepo.save(ticket);
            res.send(result);
        });
 
    app.use('/', router);
};
 
module.exports = getTicketRoutes;