import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class RoleModel extends Model {
  public id!: number;
  public nombre!: string;
}

RoleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "roles",
    schema: "dbo",
    timestamps: false
  }
);