import { Router } from "express";
import { MovimientoInventarioController } from "../controllers/MovimientoInventarioController";

const router = Router();

router.get("/movimientos-inventario", MovimientoInventarioController.getMovimientos);
router.get("/movimientos-inventario/:id", MovimientoInventarioController.getMovimientoById);
router.post("/movimientos-inventario", MovimientoInventarioController.createMovimiento);
router.put("/movimientos-inventario/:id", MovimientoInventarioController.updateMovimiento);

export default router;