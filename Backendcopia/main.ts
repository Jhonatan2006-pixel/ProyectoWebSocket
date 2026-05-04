import app from "./src/app";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./src/infrastructure/database/sequelize";
import { startSqlServerListener } from "./src/infrastructure/database/sqlServerListener";

const PORT = 3000;

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
  }
});

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

async function startServer() {
  try {
    await connectDB();

    startSqlServerListener(io);

    httpServer.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar servidor:", error);
  }
}

startServer();