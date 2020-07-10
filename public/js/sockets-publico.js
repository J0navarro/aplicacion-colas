// conexion al socket
var socket = io();
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('connect', function() {
    console.log('Conectado al Servidor');
});

socket.on('disconnect', function() {
    console.log('Conexion perdida Servidor');
});

socket.on('estadoActual', function(resp) {
    console.log(resp.actual);
    console.log(resp.ultimos4);
    actualizaHtml(resp.ultimos4);
});

socket.on('ultimos4', function(resp) {
    var sound = new Howl({
        src: ['../audio/new-ticket.mp3'],
        volume: 1,
        onend: function() {

        }
    });
    sound.play()
    actualizaHtml(resp.ultimos4);
})

function actualizaHtml(ultimos4) {
    for (var i = 0; i < ultimos4.length; i++) {

        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritrio ' + ultimos4[i].escritorio);
    }

}