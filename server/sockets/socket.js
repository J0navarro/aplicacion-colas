const { io } = require('../server');
const { TikectControl } = require('../classes/ticket-control');

const ticketControl = new TikectControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'Debe indicar el numero el escritorio'
            });
        } else {
            let atenderTicket = ticketControl.atenderTicket(data.escritorio);

            callback(atenderTicket);

            client.broadcast.emit('ultimos4', {
                ultimos4: ticketControl.getUltimos4()
            })

        }
    });



});