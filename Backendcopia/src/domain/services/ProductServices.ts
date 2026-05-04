import { ProductoModel } from "../../infrastructure/models/ProductoModel";

export interface ProductServices {
  getProductos(): Promise<ProductoModel[]>;
  getProductoById(id: number): Promise<ProductoModel | null>;
  createProducto(data: {
    nombre: string;
    descripcion?: string;
    precio: number;
    stock: number;
    imagen?: string;
    categoria_id: number;
  }): Promise<ProductoModel>;
  updateProducto(
    id: number,
    data: {
      nombre?: string;
      descripcion?: string;
      precio?: number;
      stock?: number;
      imagen?: string;
      categoria_id?: number;
    }
  ): Promise<ProductoModel | null>;
  deleteProducto(id: number): Promise<boolean>;
}