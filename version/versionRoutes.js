'use strict';
 /*Ruta para obtener la versión*/
const getVersionRoutes = (app, config) => {
    app.get('/flaguesser-ticket/version', (req, res) => {
        res.send(config.version);
    });
};
 
module.exports = getVersionRoutes;