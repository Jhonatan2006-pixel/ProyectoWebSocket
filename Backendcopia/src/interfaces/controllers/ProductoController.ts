import { Request, Response } from "express";
import { ProductServiceImpl } from "../../infrastructure/services/ProductServiceImpl";

const productService = new ProductServiceImpl();

export class ProductoController {
  static async getProductos(req: Request, res: Response): Promise<void> {
    try {
      const productos = await productService.getProductos();
      res.status(200).json(productos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ mensaje: "Error al obtener productos" });
    }
  }

  static async getProductoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const producto = await productService.getProductoById(Number(id));

      if (!producto) {
        res.status(404).json({ mensaje: "Producto no encontrado" });
        return;
      }

      res.status(200).json(producto);
    } catch (error) {
      console.error("Error al obtener producto:", error);
      res.status(500).json({ mensaje: "Error al obtener producto" });
    }
  }

  static async createProducto(req: Request, res: Response): Promise<void> {
    try {
      const nuevoProducto = await productService.createProducto(req.body);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      console.error("Error al crear producto:", error);
      res.status(500).json({ mensaje: "Error al crear producto" });
    }
  }

  static async updateProducto(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const productoActualizado = await productService.updateProducto(Number(id), req.body);

      if (!productoActualizado) {
        res.status(404).json({ mensaje: "Producto no encontrado" });
        return;
      }

      res.status(200).json(productoActualizado);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      res.status(500).json({ mensaje: "Error al actualizar producto" });
    }
  }

  static async deleteProducto(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const eliminado = await productService.deleteProducto(Number(id));

      if (!eliminado) {
        res.status(404).json({ mensaje: "Producto no encontrado" });
        return;
      }

      res.status(200).json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      res.status(500).json({ mensaje: "Error al eliminar producto" });
    }
  }
}