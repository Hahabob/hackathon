import express from "express";
import { authenticateToken, checkIsAdmin } from "../middleware/auth";
import SuperMarketController from "../controllers/SuperMarketControllers";

const router = express.Router();

router.post(
  "/create",
  authenticateToken,
  checkIsAdmin,
  SuperMarketController.createStore
);
router.delete(
  "/delete/:storeId",
  authenticateToken,
  checkIsAdmin,
  SuperMarketController.deleteStore
);
export default router;
