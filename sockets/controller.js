const socketController = (socket) => {
    console.log('Cliente conectado', socket.id)

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id)
    })

    socket.on('peticion-cliente', (payload, callback) => {

        const id = 12345
        callback(id)
        socket.broadcast.emit('respuesta-servidor', payload)
    })
}

module.exports = {
    socketController
}