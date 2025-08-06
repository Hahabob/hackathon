import express from "express";
import { authenticateToken } from "../middleware/auth";
import SuperMarketController from "../controllers/SuperMarketControllers";

const router = express.Router();

router.post("/create", authenticateToken, SuperMarketController.createStore);


export default router;
