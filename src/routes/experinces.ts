import express from "express"
import { verifyAccessToken } from "../middlewares/user.middleware";
import experienceCotroller from "../controllers/trExperience.controller";
const router = express.Router();

router.post("/add",verifyAccessToken,experienceCotroller.addExperience)
router.get("/all",verifyAccessToken,experienceCotroller.ExperienceHandler)

export default router