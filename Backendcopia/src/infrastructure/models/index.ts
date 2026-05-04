import { UsuarioModel } from "./UsuarioModel";
import { UserProfile } from "./UserProfileModel";
import { PasswordHistory } from "./PasswordHistoryModel";
import { RoleModel } from "./RoleModel";
import { UserRole } from "./UserRoleModel";

import { ProductoModel } from "./ProductoModel";
import { CategoriaModel } from "./CategoriaModel";
import { ProveedorModel } from "./ProveedorModel";
import { MovimientoInventarioModel } from "./MovimientoInventarioModel";
import { ProductoProveedorModel } from "./ProductoProveedorModel";
import { MyFriendModel } from "./MyFriendModel";
import { MyFriendEventModel } from "./MyFriendEventModel";



export const registerModels = () => {
  
  
  // 1 a 1
  
  UsuarioModel.hasOne(UserProfile, {
    foreignKey: "user_id",
    as: "profile"
  });

  UserProfile.belongsTo(UsuarioModel, {
    foreignKey: "user_id",
    as: "user"
  });

  
  
  // 1 a muchos
  
  UsuarioModel.hasMany(PasswordHistory, {
    foreignKey: "user_id",
    as: "passwordHistory"
  });

  PasswordHistory.belongsTo(UsuarioModel, {
    foreignKey: "user_id",
    as: "user"
  });

  
  
  // muchos a muchos
  
  UsuarioModel.belongsToMany(RoleModel, {
    through: UserRole,
    foreignKey: "user_id",
    otherKey: "rol_id",
    as: "roles"
  });

  RoleModel.belongsToMany(UsuarioModel, {
    through: UserRole,
    foreignKey: "rol_id",
    otherKey: "user_id",
    as: "users"
  });

  
  
  // 1 a muchos
  
  CategoriaModel.hasMany(ProductoModel, {
    foreignKey: "categoria_id",
    as: "productos"
  });

  ProductoModel.belongsTo(CategoriaModel, {
    foreignKey: "categoria_id",
    as: "categoria"
  });

    
  // 1 a muchos
  
  ProductoModel.hasMany(MovimientoInventarioModel, {
    foreignKey: "producto_id",
    as: "movimientos"
  });

  MovimientoInventarioModel.belongsTo(ProductoModel, {
    foreignKey: "producto_id",
    as: "producto"
  });

    
  // muchos a muchos
  
  ProductoModel.belongsToMany(ProveedorModel, {
    through: ProductoProveedorModel,
    foreignKey: "producto_id",
    otherKey: "proveedor_id",
    as: "proveedores"
  });

  ProveedorModel.belongsToMany(ProductoModel, {
    through: ProductoProveedorModel,
    foreignKey: "proveedor_id",
    otherKey: "producto_id",
    as: "productos"
  });

    
  // muchos a 1
  
  ProductoProveedorModel.belongsTo(ProductoModel, {
    foreignKey: "producto_id",
    as: "producto"
  });

  ProductoProveedorModel.belongsTo(ProveedorModel, {
    foreignKey: "proveedor_id",
    as: "proveedor"
  });

  ProductoModel.hasMany(ProductoProveedorModel, {
    foreignKey: "producto_id",
    as: "productoProveedorLinks"
  });

  ProveedorModel.hasMany(ProductoProveedorModel, {
    foreignKey: "proveedor_id",
    as: "productoProveedorLinks"
  });

  return {
    UsuarioModel,
    UserProfile,
    PasswordHistory,
    RoleModel,
    UserRole,
    ProductoModel,
    CategoriaModel,
    ProveedorModel,
    MovimientoInventarioModel,
    ProductoProveedorModel,
    MyFriendModel,
    MyFriendEventModel
  };
};