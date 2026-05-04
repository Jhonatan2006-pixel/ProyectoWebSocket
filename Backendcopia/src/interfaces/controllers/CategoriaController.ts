import { Request, Response } from "express";
import { CategoryServiceImpl } from "../../infrastructure/services/CategoryServiceImpl";

const categoryService = new CategoryServiceImpl();

export class CategoriaController {
  static async getCategorias(req: Request, res: Response): Promise<void> {
    try {
      const categorias = await categoryService.getCategorias();
      res.status(200).json(categorias);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      res.status(500).json({ mensaje: "Error al obtener categorías" });
    }
  }

  static async getCategoriaById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const categoria = await categoryService.getCategoriaById(Number(id));

      if (!categoria) {
        res.status(404).json({ mensaje: "Categoría no encontrada" });
        return;
      }

      res.status(200).json(categoria);
    } catch (error) {
      console.error("Error al obtener categoría:", error);
      res.status(500).json({ mensaje: "Error al obtener categoría" });
    }
  }

  static async createCategoria(req: Request, res: Response): Promise<void> {
    try {
      const nuevaCategoria = await categoryService.createCategoria(req.body);
      res.status(201).json(nuevaCategoria);
    } catch (error) {
      console.error("Error al crear categoría:", error);
      res.status(500).json({ mensaje: "Error al crear categoría" });
    }
  }

  static async updateCategoria(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const categoriaActualizada = await categoryService.updateCategoria(Number(id), req.body);

      if (!categoriaActualizada) {
        res.status(404).json({ mensaje: "Categoría no encontrada" });
        return;
      }

      res.status(200).json(categoriaActualizada);
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      res.status(500).json({ mensaje: "Error al actualizar categoría" });
    }
  }

  static async deleteCategoria(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const eliminada = await categoryService.deleteCategoria(Number(id));

      if (!eliminada) {
        res.status(404).json({ mensaje: "Categoría no encontrada" });
        return;
      }

      res.status(200).json({ mensaje: "Categoría eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      res.status(500).json({ mensaje: "Error al eliminar categoría" });
    }
  }
}