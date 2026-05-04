import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class ProveedorModel extends Model {
  public id!: number;
  public nombre!: string;
  public telefono!: string;
  public direccion!: string;
  public correo!: string;
  public activo!: boolean;
}

ProveedorModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: "proveedores",
    schema: "dbo",
    timestamps: false
  }
);