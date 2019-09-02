'use strict';
 /*conexión con express y comunicación con el repositorio de tickets*/
const Router = require('express');
const TicketModel = require('../ticket/ticketModel');
const ticketRepo = require('../ticket/ticketRepository');
 

 /*Rutas de la API*/
const getTicketRoutes = (app) => {
    const router = new Router();
 
    router
        /*Ruta GET para obtener un ticket por id*/
        .get('/get/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const result = ticketRepo.getById(id);
            res.send(result);
        })
        /*Ruta GET para obtener todos los tickets*/
        .get('/all', (req, res) => {
            const result = ticketRepo.getAll();
            console.log(result);
            res.send(result);
        })

        /*Ruta DELETE para eliminar un ticket por id*/
        .delete('/remove/:id', (req, res) => {
            const id = parseInt(req.params.id);
            //ticketRepo.remove(id);
            const result = ticketRepo.remove(id);
            res.send(result);
        })
        /*Ruta POST para generar un nuevo ticket*/
        .post('/save', (req, res) => {
            const ticket = req.body;
            const result = ticketRepo.save(ticket);
            res.send(result);
        });
    /*Se elimina el sufijo "api" por comodidad*/
    app.use('/', router);
};
 
module.exports = getTicketRoutes;