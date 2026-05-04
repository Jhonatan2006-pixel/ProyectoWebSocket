import { CategoriaModel } from "../../infrastructure/models/CategoriaModel";

export interface CategoryServices {
  getCategorias(): Promise<CategoriaModel[]>;
  getCategoriaById(id: number): Promise<CategoriaModel | null>;
  createCategoria(data: {
    nombre: string;
    descripcion?: string;
  }): Promise<CategoriaModel>;
  updateCategoria(
    id: number,
    data: {
      nombre?: string;
      descripcion?: string;
    }
  ): Promise<CategoriaModel | null>;
  deleteCategoria(id: number): Promise<boolean>;
}