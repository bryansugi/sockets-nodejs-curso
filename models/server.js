const express = require('express')
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        //middlewares
        this.middlewares()

        //rutas de mi aplicacion
        this.routes()

        //configuracion socktes
        this.sockets()
    }

    middlewares() {

        //cors
        this.app.use(cors())

        //directorio publico
        this.app.use(express.static('public'))

    }

    routes() {
        //this.app.use(this.authPath, require('../routes/'))
    }

    sockets() {
        this.io.on('connection', socketController)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}

module.exports = Server