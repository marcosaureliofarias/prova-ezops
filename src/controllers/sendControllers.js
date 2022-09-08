import Message from "../models/sendModels.js";

class SendMessage {
  static sendListar = (req, res) => {
    Message.find({}, (err, messages) => {
      res.send(messages);
    });
  };

  static sendDelete = (req, res) => {
    Message.remove({}, (err, messages) => {
      res.send(messages);
    });
  };

  static sendUser = (req, res) => {
    let user = req.params.user;
    Message.find({ name: user }, (err, messages) => {
      res.send(messages);
    });
  };

  static sendPost = async (req, res) => {
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
  };
}

export default SendMessage;
