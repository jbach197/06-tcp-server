'use strict';

const EventEmitter = require('events');
const net = require('net');
const uuid = require('uuid/v4');

const port = process.env.PORT || 3000;
const server = net.createServer;
const events = new EventEmitter();
const socketPool = {};

//Constructor to create user object
let User = function(socket) {
    let id = uuid();
    this.id = id;
    this.nickname = `User-${id}`;
    this.socket = socket;
};

//Create new instance of user object when someone connects for the first time
server.on('connection', (socket) => {
    let user = new Usert(socket);
    socketPool[user.id] = user;
    socket.on('data', (buffer) => dispatchAction(user.id, buffer));
});

/*Parse the chat text into components.  Command is the @ command provided by user, payload is full text after command, target is first word after command, message is everything after the target.*/

let parse = (buffer) => {
    let info = buffer.toString().trim;
    if(!text.startsWith('@')){return null;}
    let [command, payload] = text.split(/\s+(.*)/);
    let [target, message] = payload.split(/\s+(.*)/);
    return {command, payload, target, message};
};

//Parse command buffer and triggers events
let action = (userID, buffer) => {
    let entry = parse(buffer);
    entry && events.emit(entry.command, entry, userId);
};

//Send a message to everyone in the chat group
events.on('@all', (data, userId) => {
    for (let connection in socketPool) {
        let user = socketPool[connection];
        user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
    }
});

//Allow user to change their nickname
events.on('@nickname', (data, userId) => {
    socketPool[userId].nickname = data.target
});




