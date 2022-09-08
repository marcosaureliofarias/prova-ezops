import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  // ...
});

io.on("connection", (socket) => {
  console.log("cliente connected");
});

var server = httpServer.listen(3000, () => {
  console.log("server is running on port", server.address().port);
});
