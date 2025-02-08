import express from "express";
import AuthController from "../controllers/userAuth.controller";
import { verifyAccessToken } from "../middlewares/user.middleware";
const router = express.Router();

router.post("/signup",AuthController.signUpUser)
router.post("/signin",AuthController.signIn)
router.get("/getMe",verifyAccessToken,AuthController.getMe)
router.post("/logout",verifyAccessToken,AuthController.logout)
export default router
