import { ProductServices } from "../../domain/services/ProductServices";
import { ProductoModel } from "../models/ProductoModel";
import { MovimientoInventarioModel } from "../models/MovimientoInventarioModel";
import { ProductoProveedorModel } from "../models/ProductoProveedorModel";

export class ProductServiceImpl implements ProductServices {
  async getProductos(): Promise<ProductoModel[]> {
    return await ProductoModel.findAll();
  }

  async getProductoById(id: number): Promise<ProductoModel | null> {
    return await ProductoModel.findByPk(id);
  }

  async createProducto(data: {
    nombre: string;
    descripcion?: string;
    precio: number;
    stock: number;
    imagen?: string;
    categoria_id: number;
  }): Promise<ProductoModel> {
    return await ProductoModel.create({
      ...data,
      imagen: data.imagen && data.imagen.trim() !== '' ? data.imagen : null
    } as any);
  }

  async updateProducto(
    id: number,
    data: {
      nombre?: string;
      descripcion?: string;
      precio?: number;
      stock?: number;
      imagen?: string;
      categoria_id?: number;
    }
  ): Promise<ProductoModel | null> {
    const producto = await ProductoModel.findByPk(id);

    if (!producto) {
      return null;
    }

    await producto.update({
      ...data,
      imagen: data.imagen && data.imagen.trim() !== '' ? data.imagen : null
    });

    return producto;
  }

  async deleteProducto(id: number): Promise<boolean> {
    const producto = await ProductoModel.findByPk(id);

    if (!producto) {
      return false;
    }

    await MovimientoInventarioModel.destroy({
      where: { producto_id: id }
    });

    await ProductoProveedorModel.destroy({
      where: { producto_id: id }
    });

    await producto.destroy();
    return true;
  }
}