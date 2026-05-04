import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class UserRole extends Model {
  public user_id!: number;
  public rol_id!: number;
}

UserRole.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  },
  {
    sequelize,
    tableName: "user_roles",
    schema: "dbo",
    timestamps: false
  }
);