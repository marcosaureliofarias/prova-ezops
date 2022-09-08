import mongoose from "mongoose";

const sendShema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  message: { type: String },
});

const Message = mongoose.model("Message", sendShema);

export default Message;
