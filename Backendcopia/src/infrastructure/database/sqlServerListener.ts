import { Server } from "socket.io";
import { MyFriendEventModel } from "../models/MyFriendEventModel";

export function startSqlServerListener(io: Server) {
  console.log("Listener de SQL Server iniciado...");

  setInterval(async () => {
    try {
      const events = await MyFriendEventModel.findAll({
        where: {
          processed: false
        },
        order: [["id", "ASC"]],
        limit: 10
      });

      if (events.length > 0) {
        console.log("Eventos encontrados:", events.map(e => e.toJSON()));
      }

      for (const event of events) {
        io.emit("friend_updated", {
          id: event.id,
          tableName: event.table_name,
          columnName: event.column_name,
          oldValue: event.old_value,
          newValue: event.new_value,
          rowId: event.row_id,
          eventType: event.event_type,
          createdAt: event.created_at
        });

        await event.update({
          processed: true
        });

        console.log("Evento enviado y marcado como procesado:", event.id);
      }
    } catch (error) {
      console.error("Error escuchando eventos de SQL Server:", error);
    }
  }, 1000);
}