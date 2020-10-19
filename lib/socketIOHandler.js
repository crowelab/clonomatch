const server = require("../bin/www");

// const io = require("socket.io")(server, {
//     handlePreflightRequest: (req, res) => {
//         const headers = {
//             "Access-Control-Allow-Headers": "Content-Type, Authorization",
//             "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
//             "Access-Control-Allow-Credentials": true
//         };
//         res.writeHead(200, headers);
//         res.end();
//     }
// });

const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

const TIMEOUT = 300000;

class SocketIOHandler {
    constructor() {
        this.clientProcessMap = new Map();

        this.io = io;
        this.io.origins('*:*');

        this.io.on('connection', (client) => {
            console.log("Connection with client:", client.id);

            client.on('disconnect', (client) => {
                console.log("Disconnected:", client.id);
            })
        });
        io.on('disconnected', (client) => {
            this.clientProcessMap.delete(client.id);
        });
    }

    hasProcess(id) {
        return this.clientProcessMap.get(id) != null;
    }

    addProcess(id, process) {
        this.clientProcessMap.get(id)['process'] = process;

        console.log("Set:",id,type)
    }

    removeProcess(id) {
        this.clientProcessMap.set(id,null);
    }
}

const handler = new SocketIOHandler();

module.exports = {
    socketHandler: handler
};