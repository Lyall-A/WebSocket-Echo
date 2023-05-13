const ws = require("ws");
const port = process.argv[2] || 8080;
const server = new ws.WebSocketServer({port})
server.on("listening", () => console.log(`Listening on port ${port}`))
server.on("close", () => console.log("Connection closed!"))
server.on("error", err => console.log(`Error occurred on server! ${err}`))
server.on("connection", client => {
    console.log("Client has connected");
    client.on("close", code => console.log(`Client disconnected with code ${code}`))
    client.on("error", err => console.log(`Client error occurred! ${err}`))
    client.on("ping", data => {
        console.log(`Received ping from client${data ? `, data: ${data}` : " with no data"}`);
        client.pong(data);
    });
    client.on("message", msg => {
        console.log(`Received message from client, message: ${msg}`);
        client.send(Buffer.from(msg).toString());
    });
})