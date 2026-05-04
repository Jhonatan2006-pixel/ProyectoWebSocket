import { SupplierServices } from "../../domain/services/SupplierServices";
import { ProveedorModel } from "../models/ProveedorModel";
import { ProductoProveedorModel } from "../models/ProductoProveedorModel";

export class SupplierServiceImpl implements SupplierServices {
  async getProveedores(): Promise<ProveedorModel[]> {
    return await ProveedorModel.findAll({
      order: [["id", "ASC"]]
    });
  }

  async getProveedorById(id: number): Promise<ProveedorModel | null> {
    return await ProveedorModel.findByPk(id);
  }

  async createProveedor(data: {
    nombre: string;
    telefono?: string;
    direccion?: string;
    correo?: string;
    activo?: boolean;
  }): Promise<ProveedorModel> {
    return await ProveedorModel.create({
      ...data,
      activo: data.activo ?? true
    } as any);
  }

  async updateProveedor(
    id: number,
    data: {
      nombre?: string;
      telefono?: string;
      direccion?: string;
      correo?: string;
      activo?: boolean;
    }
  ): Promise<ProveedorModel | null> {
    const proveedor = await ProveedorModel.findByPk(id);

    if (!proveedor) {
      return null;
    }

    await proveedor.update(data);
    return proveedor;
  }

  async deleteProveedor(id: number): Promise<boolean> {
    const proveedor = await ProveedorModel.findByPk(id);

    if (!proveedor) {
      return false;
    }

    await ProductoProveedorModel.destroy({
      where: { proveedor_id: id }
    });

    await proveedor.destroy();
    return true;
  }

  async toggleProveedor(id: number): Promise<ProveedorModel | null> {
    const proveedor = await ProveedorModel.findByPk(id);

    if (!proveedor) {
      return null;
    }

    await proveedor.update({
      activo: !proveedor.activo
    });

    return proveedor;
  }
}