import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController";

const router = Router();

router.get("/categorias", CategoriaController.getCategorias);
router.get("/categorias/:id", CategoriaController.getCategoriaById);
router.post("/categorias", CategoriaController.createCategoria);
router.put("/categorias/:id", CategoriaController.updateCategoria);
router.delete("/categorias/:id", CategoriaController.deleteCategoria);

export default router;