import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

var app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Message = mongoose.model("Message", {
  name: String,
  message: String,
});

mongoose.connect(
  "mongodb+srv://marcos:123@cluster0.klqkk.mongodb.net/?retryWrites=true&w=majority"
);

let db = mongoose.connection;

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.delete("/messages", (req, res) => {
  Message.remove({}, (err, messages) => {
    res.send(messages);
  });
});

app.get("/messages/:user", (req, res) => {
  var user = req.params.user;
  Message.find({ name: user }, (err, messages) => {
    res.send(messages);
  });
});

app.post("/messages", async (req, res) => {
  try {
    var message = new Message(req.body);

    var savedMessage = await message.save();
    console.log("saved");

    var censored = await Message.findOne({ message: "badword" });
    if (censored) await Message.remove({ _id: censored.id });
    else io.emit("message", req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    return console.log("error", error);
  } finally {
    console.log("Message Posted");
  }
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  // ...
});

io.on("connection", () => {
  // ...
});

// io.on("connection", () => {
//   console.log("a user is connected");
// });

var server = httpServer.listen(3000, () => {
  console.log("server is running on port", server.address().port);
});
