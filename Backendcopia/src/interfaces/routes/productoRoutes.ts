import { Router } from "express";
import { ProductoController } from "../controllers/ProductoController";

const router = Router();

router.get("/productos", ProductoController.getProductos);
router.get("/productos/:id", ProductoController.getProductoById);
router.post("/productos", ProductoController.createProducto);
router.put("/productos/:id", ProductoController.updateProducto);
router.delete("/productos/:id", ProductoController.deleteProducto);

export default router;