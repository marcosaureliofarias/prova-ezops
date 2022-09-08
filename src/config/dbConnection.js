import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://marcos:123@cluster0.klqkk.mongodb.net/?retryWrites=true&w=majority"
);

let db = mongoose.connection;

export default db;
