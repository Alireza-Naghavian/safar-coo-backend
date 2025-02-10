import express from "express";
import { verifyAccessToken } from "../middlewares/user.middleware";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.route("/tickets").post(verifyAccessToken, UserController.createTicket)
.get(verifyAccessToken,UserController.getTickets)



export default router;
