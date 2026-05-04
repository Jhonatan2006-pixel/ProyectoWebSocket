import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class UserProfile extends Model {
  public id!: number;
  public user_id!: number;
  public telefono!: string;
  public bio!: string;
  public direccion!: string;
  public fecha_cumpleanios!: Date;
  public genero!: string;
  public foto!: string; // base64
}

UserProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_cumpleanios: {
      type: DataTypes.DATE,
      allowNull: true
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: true
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: false
}
  },
  {
    sequelize,
    tableName: "user_profile",
    schema: "dbo",
    timestamps: false
  }
);