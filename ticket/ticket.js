'use strict';
 
/*Constructor de la clase Ticket para el repositorio*/
class Ticket {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}
 /*Exportamos la clase*/
module.exports = Ticket;