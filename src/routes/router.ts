import express from "express";
import AuthRoutes from "./auth";
import UserRoutes from "./user"
import notifications from "./notifications"
const router: express.Router = express.Router();
router.use("/auth", AuthRoutes);
router.use("/user",UserRoutes);
router.use("/notif",notifications)
export default router  
