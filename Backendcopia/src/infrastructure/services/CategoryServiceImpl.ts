import { CategoryServices } from "../../domain/services/CategoryServices";
import { CategoriaModel } from "../models/CategoriaModel";

export class CategoryServiceImpl implements CategoryServices {
  async getCategorias(): Promise<CategoriaModel[]> {
    return await CategoriaModel.findAll();
  }

  async getCategoriaById(id: number): Promise<CategoriaModel | null> {
    return await CategoriaModel.findByPk(id);
  }

  async createCategoria(data: {
    nombre: string;
    descripcion?: string;
  }): Promise<CategoriaModel> {
    return await CategoriaModel.create(data as any);
  }

  async updateCategoria(
    id: number,
    data: {
      nombre?: string;
      descripcion?: string;
    }
  ): Promise<CategoriaModel | null> {
    const categoria = await CategoriaModel.findByPk(id);

    if (!categoria) return null;

    await categoria.update(data);
    return categoria;
  }

  async deleteCategoria(id: number): Promise<boolean> {
    const categoria = await CategoriaModel.findByPk(id);

    if (!categoria) return false;

    await categoria.destroy();
    return true;
  }
}