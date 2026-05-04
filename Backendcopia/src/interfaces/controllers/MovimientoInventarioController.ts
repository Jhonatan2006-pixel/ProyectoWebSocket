import { Request, Response } from "express";
import { MovimientoInventarioServiceImpl } from "../../infrastructure/services/MovimientoInventarioServiceImpl";

const movimientoService = new MovimientoInventarioServiceImpl();

export class MovimientoInventarioController {
  static async getMovimientos(req: Request, res: Response): Promise<void> {
    try {
      const movimientos = await movimientoService.getMovimientos();
      res.status(200).json(movimientos);
    } catch (error) {
      console.error("Error al obtener movimientos:", error);
      res.status(500).json({ mensaje: "Error al obtener movimientos" });
    }
  }

  static async getMovimientoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const movimiento = await movimientoService.getMovimientoById(Number(id));

      if (!movimiento) {
        res.status(404).json({ mensaje: "Movimiento no encontrado" });
        return;
      }

      res.status(200).json(movimiento);
    } catch (error) {
      console.error("Error al obtener movimiento:", error);
      res.status(500).json({ mensaje: "Error al obtener movimiento" });
    }
  }

  static async createMovimiento(req: Request, res: Response): Promise<void> {
    try {
      const nuevoMovimiento = await movimientoService.createMovimiento(req.body);
      res.status(201).json(nuevoMovimiento);
    } catch (error) {
      console.error("Error al crear movimiento:", error);
      res.status(500).json({ mensaje: "Error al crear movimiento" });
    }
  }

  static async updateMovimiento(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const movimientoActualizado = await movimientoService.updateMovimiento(
        Number(id),
        req.body
      );

      if (!movimientoActualizado) {
        res.status(404).json({ mensaje: "Movimiento no encontrado" });
        return;
      }

      res.status(200).json(movimientoActualizado);
    } catch (error) {
      console.error("Error al actualizar movimiento:", error);
      res.status(500).json({ mensaje: "Error al actualizar movimiento" });
    }
  }
}