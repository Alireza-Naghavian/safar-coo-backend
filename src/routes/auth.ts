import express from "express";
import AuthController from "../controllers/userAuth.controller";
const router = express.Router();

router.post("/signup",AuthController.signUpUser)
router.post("/signin",AuthController.signIn)


export default router
