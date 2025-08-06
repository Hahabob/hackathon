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
  "/:storeId",
  authenticateToken,
  checkIsAdmin,
  SuperMarketController.deleteStore
);
router.patch(
  "/:storeId",
  authenticateToken,
  checkIsAdmin,
  SuperMarketController.updateStore
);
export default router;

