/**
 * Rutas para productos.
 * 
 * @module productRoutes
 */
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = Router();

router.use(authMiddleware);  

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;