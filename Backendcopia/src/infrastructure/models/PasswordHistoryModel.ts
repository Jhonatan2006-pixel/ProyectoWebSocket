import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class PasswordHistory extends Model {
  public id!: number;
  public user_id!: number;
  public password_hash!: string;
}

PasswordHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "password_history",
    schema: "dbo",
    timestamps: false
  }
);