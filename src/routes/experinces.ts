import express from "express"
import { verifyAccessToken } from "../middlewares/user.middleware";
import experienceCotroller from "../controllers/trExperience.controller";
const router = express.Router();

router.post("/add",verifyAccessToken,experienceCotroller.addExperience)
router.get("/allInPanel",verifyAccessToken,experienceCotroller.ExperienceHandler)
router.delete("/:expId",verifyAccessToken,experienceCotroller.removeExperiences)

export default router