// conexion al socket
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al Servidor');
});

socket.on('disconnect', function() {
    console.log('Conexion perdida Servidor');
});
socket.on('estadoActual', function(resp) {
    console.log(resp.actual);
    label.text(resp.actual);
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(resp) {
        label.text(resp);
    });


})