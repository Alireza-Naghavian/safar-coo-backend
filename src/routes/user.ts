import express from "express";
import { verifyAccessToken } from "../middlewares/user.middleware";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.route("/ticket").post(verifyAccessToken, UserController.createTicket)
.get(verifyAccessToken,UserController.ticket)

export default router;
