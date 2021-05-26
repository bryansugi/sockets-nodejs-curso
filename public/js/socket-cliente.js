//console.log("Inicia mi mundo en sockets")

const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')

const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')



const socket = io()

socket.on('connect', () => {
    //console.log('Conectado')

    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
})

socket.on('disconnect', () => {
    //console.log('Desconectado del servidor')

    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
})

let acomulado = ''
socket.on('respuesta-servidor', (payload) => {
    const { mensaje, id, fecha, estado } = payload
    acomulado = acomulado + mensaje + '<br>'
    document.getElementById("respuesta").innerHTML = acomulado

})

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value

    const payload = {
        mensaje,
        id: 'streaming1',
        fecha: new Date().getTime(),
        estado: 1
    }

    socket.emit('peticion-cliente', payload, (id) => {
        console.log('respuesta del servidor para este callback', id)
    })

})