import express from "express";
import SendMessage from "../controllers/sendControllers.js";

const router = express.Router();

router.get("/messages", SendMessage.sendListar);
router.delete("/messages", SendMessage.sendDelete);
router.get("/messages/:user", SendMessage.sendUser);
router.post("/messages", SendMessage.sendPost);

export default router;
