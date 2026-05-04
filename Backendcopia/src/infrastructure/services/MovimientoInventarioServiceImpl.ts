import { MovimientoInventarioServices } from "../../domain/services/MovimientoInventarioServices";
import { MovimientoInventarioModel } from "../models/MovimientoInventarioModel";
import { ProductoModel } from "../models/ProductoModel";

export class MovimientoInventarioServiceImpl implements MovimientoInventarioServices {
  async getMovimientos(): Promise<MovimientoInventarioModel[]> {
    return await MovimientoInventarioModel.findAll({
      include: [
        {
          model: ProductoModel,
          as: "producto",
          attributes: ["id", "nombre"]
        }
      ],
      order: [["id", "ASC"]]
    });
  }

  async getMovimientoById(id: number): Promise<MovimientoInventarioModel | null> {
    return await MovimientoInventarioModel.findByPk(id, {
      include: [
        {
          model: ProductoModel,
          as: "producto",
          attributes: ["id", "nombre"]
        }
      ]
    });
  }

  private normalizarFecha(fecha: string | Date): string {
    const fechaObj = typeof fecha === "string" ? new Date(fecha) : fecha;

    if (isNaN(fechaObj.getTime())) {
      throw new Error("La fecha enviada no es válida");
    }

    const year = fechaObj.getFullYear();
    const month = String(fechaObj.getMonth() + 1).padStart(2, "0");
    const day = String(fechaObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  async createMovimiento(data: {
    producto_id: number;
    tipo_movimiento: string;
    cantidad: number;
    fecha: string | Date;
    observacion?: string;
  }): Promise<MovimientoInventarioModel> {
    const fechaNormalizada = this.normalizarFecha(data.fecha);

    return await MovimientoInventarioModel.create({
      ...data,
      fecha: fechaNormalizada
    } as any);
  }

  async updateMovimiento(
    id: number,
    data: {
      producto_id?: number;
      tipo_movimiento?: string;
      cantidad?: number;
      fecha?: string | Date;
      observacion?: string;
    }
  ): Promise<MovimientoInventarioModel | null> {
    const movimiento = await MovimientoInventarioModel.findByPk(id);

    if (!movimiento) {
      return null;
    }

    const datosActualizados: any = { ...data };

    if (data.fecha) {
      datosActualizados.fecha = this.normalizarFecha(data.fecha);
    }

    await movimiento.update(datosActualizados);
    return movimiento;
  }
}