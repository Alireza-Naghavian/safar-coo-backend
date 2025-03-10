import express from "express"
import NotifController from "../controllers/notifications.controller";
import { verifyAccessToken } from "../middlewares/user.middleware";
const router = express.Router();

router.get("/all",verifyAccessToken,NotifController.getUserNotifs)
router.patch("/update",verifyAccessToken,NotifController.makeNotfiAsRead)
export default router