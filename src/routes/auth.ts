import express from "express";
import AuthController from "../controllers/userAuth.controller";
import { verifyAccessToken } from "../middlewares/user.middleware";
const router = express.Router();

router.post("/signup",AuthController.signUpUser)
router.post("/signin",AuthController.signIn)
router.get("/getMe",verifyAccessToken,AuthController.getMe)
router.get("/refresh-token",AuthController.refreshToken)
router.post("/logout",verifyAccessToken,AuthController.logout)
router.post("/request-reset",AuthController.sendingEmail)
router.post("/reset-password",AuthController.resetPassword)
router.patch("/user/edit",verifyAccessToken,AuthController.editUserProfile)
router.get("/clientAuthMiddleware",AuthController.clientAuthMiddleware)

export default router
