import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class MyFriendEventModel extends Model {
  public id!: number;
  public table_name!: string;
  public column_name!: string;
  public old_value!: string | null;
  public new_value!: string | null;
  public row_id!: number;
  public event_type!: string;
  public created_at!: Date;
  public processed!: boolean;
}

MyFriendEventModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    table_name: {
      type: DataTypes.STRING(100)
    },
    column_name: {
      type: DataTypes.STRING(100)
    },
    old_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    new_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    row_id: {
      type: DataTypes.INTEGER
    },
    event_type: {
      type: DataTypes.STRING(20)
    },
    created_at: {
      type: DataTypes.DATE
    },
    processed: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    tableName: "my_friends_events",
    timestamps: false
  }
);