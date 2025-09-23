/**
 * Rutas para pedidos.
 * 
 * @module orderRoutes
 */
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createOrder, getOrders, getOrderById, cancelOrder } from "../controllers/orderController.js";

const router = Router();

router.use(authMiddleware);  // Protege todos

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id/cancel", cancelOrder);

export default router;