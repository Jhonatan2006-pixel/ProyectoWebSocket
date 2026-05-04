import { ProveedorModel } from "../../infrastructure/models/ProveedorModel";

export interface SupplierServices {
  getProveedores(): Promise<ProveedorModel[]>;
  getProveedorById(id: number): Promise<ProveedorModel | null>;
  createProveedor(data: {
    nombre: string;
    telefono?: string;
    direccion?: string;
    correo?: string;
    activo?: boolean;
  }): Promise<ProveedorModel>;
  updateProveedor(
    id: number,
    data: {
      nombre?: string;
      telefono?: string;
      direccion?: string;
      correo?: string;
      activo?: boolean;
    }
  ): Promise<ProveedorModel | null>;
  deleteProveedor(id: number): Promise<boolean>;
  toggleProveedor(id: number): Promise<ProveedorModel | null>;
}