import { Router } from "express";
import { ProveedorController } from "../controllers/ProveedorController";

const router = Router();

router.get("/proveedores", ProveedorController.getProveedores);
router.get("/proveedores/:id", ProveedorController.getProveedorById);
router.post("/proveedores", ProveedorController.createProveedor);
router.put("/proveedores/:id", ProveedorController.updateProveedor);
router.patch("/proveedores/:id/toggle", ProveedorController.toggleProveedor);
router.delete("/proveedores/:id", ProveedorController.deleteProveedor);

export default router;