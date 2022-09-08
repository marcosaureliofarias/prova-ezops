import express from "express";
import bodyParser from "body-parser";
import db from "./config/dbConnection.js";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

db.on("Error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

var app = express();
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

export default app;
