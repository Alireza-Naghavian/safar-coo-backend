import express from "express"
import NotifController from "../controllers/notifications.controller";
import { verifyAccessToken } from "../middlewares/user.middleware";
const router = express.Router();

router.get("/all",verifyAccessToken,NotifController.getNotifs)
router.patch("/update",verifyAccessToken,NotifController.makeNotfiAsRead)
router.delete("/:notifId",verifyAccessToken,NotifController.removeNotif)
export default router