import { MovimientoInventarioModel } from "../../infrastructure/models/MovimientoInventarioModel";

export interface MovimientoInventarioServices {
  getMovimientos(): Promise<MovimientoInventarioModel[]>;
  getMovimientoById(id: number): Promise<MovimientoInventarioModel | null>;
  createMovimiento(data: {
    producto_id: number;
    tipo_movimiento: string;
    cantidad: number;
    fecha: string | Date;
    observacion?: string;
  }): Promise<MovimientoInventarioModel>;
  updateMovimiento(
    id: number,
    data: {
      producto_id?: number;
      tipo_movimiento?: string;
      cantidad?: number;
      fecha?: string | Date;
      observacion?: string;
    }
  ): Promise<MovimientoInventarioModel | null>;
}