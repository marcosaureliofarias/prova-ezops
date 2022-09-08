import express from "express";
import router from "./senRoutes.js";

const routes = (app) => {
  app.route("/check").get((req, res) => {
    res.status(200).send({ titulo: "Prova de DevOps" });
  });

  app.use(express.json(), router);
};

export default routes;
