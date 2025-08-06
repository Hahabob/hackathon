import express from "express";
import { authenticateToken, checkIsAdmin } from "../middleware/auth";
import ProductController from "../controllers/ProductController";

const router = express.Router();

router.post(
  "/create",
  authenticateToken,
  checkIsAdmin,
  ProductController.create
);
router.get("/", ProductController.getAll);
router.get("/:productId", ProductController.get);
router.patch(
  "/:productId",
  authenticateToken,
  checkIsAdmin,
  ProductController.update
);
router.patch(
  "/move/:productId",
  authenticateToken,
  checkIsAdmin,
  ProductController.move
);
router.delete(
  "/:productId",
  authenticateToken,
  checkIsAdmin,
  ProductController.delete
);

export default router;
