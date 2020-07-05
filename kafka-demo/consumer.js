const express = require ("express");
const kafkaSubscriber = require("./subscribe");
const Websocket =require("ws");
const app = express();

const server = new Websocket.Server({port:3030});

function send (message)
 {
    server.clients.forEach(client=>{
    client.send(message.value);
});
}

server.on("error",(err)=>{
    console.log("error");
});

server.on("connection",(connection)=>{
        kafkaSubscriber('test',(message)=>{
        console.log(message);
        send(message);
    });
});

app.listen(3000,()=>{
    console.log("server is listenning");
})
