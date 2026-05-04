import { Request, Response } from "express";
import { FriendServiceImpl } from "../../infrastructure/services/FriendServiceImpl";

const friendService = new FriendServiceImpl();

export class FriendController {
  static async getFriends(_req: Request, res: Response): Promise<void> {
    try {
      const friends = await friendService.getFriends();
      res.status(200).json(friends);
    } catch (error) {
      console.error("Error al obtener amigos:", error);
      res.status(500).json({ mensaje: "Error al obtener amigos" });
    }
  }

  static async getFriendById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const friend = await friendService.getFriendById(Number(id));

      if (!friend) {
        res.status(404).json({ mensaje: "Amigo no encontrado" });
        return;
      }

      res.status(200).json(friend);
    } catch (error) {
      console.error("Error al obtener amigo:", error);
      res.status(500).json({ mensaje: "Error al obtener amigo" });
    }
  }

  static async createFriend(req: Request, res: Response): Promise<void> {
    try {
      const nuevoFriend = await friendService.createFriend(req.body);
      res.status(201).json(nuevoFriend);
    } catch (error) {
      console.error("Error al crear amigo:", error);
      res.status(500).json({ mensaje: "Error al crear amigo" });
    }
  }

  static async updateFriend(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const friendActualizado = await friendService.updateFriend(Number(id), req.body);

      if (!friendActualizado) {
        res.status(404).json({ mensaje: "Amigo no encontrado" });
        return;
      }

      res.status(200).json(friendActualizado);
    } catch (error) {
      console.error("Error al actualizar amigo:", error);
      res.status(500).json({ mensaje: "Error al actualizar amigo" });
    }
  }

  static async deleteFriend(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const eliminado = await friendService.deleteFriend(Number(id));

      if (!eliminado) {
        res.status(404).json({ mensaje: "Amigo no encontrado" });
        return;
      }

      res.status(200).json({ mensaje: "Amigo eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar amigo:", error);
      res.status(500).json({ mensaje: "Error al eliminar amigo" });
    }
  }
}