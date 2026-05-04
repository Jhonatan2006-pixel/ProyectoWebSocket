import express from "express";
import cors from "cors";
import authRoutes from "./interfaces/routes/authRoutes";
import productoRoutes from "./interfaces/routes/productoRoutes";
import categoriaRoutes from "./interfaces/routes/categoriaRoutes";
import proveedorRoutes from "./interfaces/routes/proveedorRoutes";
import movimientoInventarioRoutes from "./interfaces/routes/movimientoInventarioRoutes";
import friendRoutes from "./interfaces/routes/friendRoutes";

export const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (_req, res) => {
  res.send("Backend funcionando");
});

app.use(authRoutes);
app.use(productoRoutes);
app.use(categoriaRoutes);
app.use(proveedorRoutes);
app.use(movimientoInventarioRoutes);
app.use(friendRoutes);

export default app;