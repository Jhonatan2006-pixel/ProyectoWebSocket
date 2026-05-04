import { Request, Response } from "express";
import { SupplierServiceImpl } from "../../infrastructure/services/SupplierServiceImpl";

const supplierService = new SupplierServiceImpl();

export class ProveedorController {
  static async getProveedores(req: Request, res: Response): Promise<void> {
    try {
      const proveedores = await supplierService.getProveedores();
      res.status(200).json(proveedores);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
      res.status(500).json({ mensaje: "Error al obtener proveedores" });
    }
  }

  static async getProveedorById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const proveedor = await supplierService.getProveedorById(Number(id));

      if (!proveedor) {
        res.status(404).json({ mensaje: "Proveedor no encontrado" });
        return;
      }

      res.status(200).json(proveedor);
    } catch (error) {
      console.error("Error al obtener proveedor:", error);
      res.status(500).json({ mensaje: "Error al obtener proveedor" });
    }
  }

  static async createProveedor(req: Request, res: Response): Promise<void> {
    try {
      const nuevoProveedor = await supplierService.createProveedor(req.body);
      res.status(201).json(nuevoProveedor);
    } catch (error) {
      console.error("Error al crear proveedor:", error);
      res.status(500).json({ mensaje: "Error al crear proveedor" });
    }
  }

  static async updateProveedor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const proveedorActualizado = await supplierService.updateProveedor(
        Number(id),
        req.body
      );

      if (!proveedorActualizado) {
        res.status(404).json({ mensaje: "Proveedor no encontrado" });
        return;
      }

      res.status(200).json(proveedorActualizado);
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);
      res.status(500).json({ mensaje: "Error al actualizar proveedor" });
    }
  }

  static async deleteProveedor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const eliminado = await supplierService.deleteProveedor(Number(id));

      if (!eliminado) {
        res.status(404).json({ mensaje: "Proveedor no encontrado" });
        return;
      }

      res.status(200).json({ mensaje: "Proveedor eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
      res.status(500).json({ mensaje: "Error al eliminar proveedor" });
    }
  }

  static async toggleProveedor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const proveedor = await supplierService.toggleProveedor(Number(id));

      if (!proveedor) {
        res.status(404).json({ mensaje: "Proveedor no encontrado" });
        return;
      }

      res.status(200).json(proveedor);
    } catch (error) {
      console.error("Error al cambiar estado del proveedor:", error);
      res.status(500).json({ mensaje: "Error al cambiar estado del proveedor" });
    }
  }
}