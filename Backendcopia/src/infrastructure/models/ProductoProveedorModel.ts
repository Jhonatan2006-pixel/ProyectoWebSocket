import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class ProductoProveedorModel extends Model {
  public producto_id!: number;
  public proveedor_id!: number;
}

ProductoProveedorModel.init(
  {
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    proveedor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  },
  {
    sequelize,
    tableName: "producto_proveedor",
    schema: "dbo",
    timestamps: false
  }
);