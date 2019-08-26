'use strict';
 
const getVersionRoutes = (app, config) => {
    app.get('/flaguesser-ticket/version', (req, res) => {
        res.send(config.version);
    });
};
 
module.exports = getVersionRoutes;