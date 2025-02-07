import express from "express";
import AuthRoutes from "./auth";
const router: express.Router = express.Router();

router.use("/auth", AuthRoutes);
export default router  
