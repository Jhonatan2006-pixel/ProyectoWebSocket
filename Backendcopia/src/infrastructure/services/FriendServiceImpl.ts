import { FriendServices } from "../../domain/services/FriendServices";
import { MyFriendModel } from "../models/MyFriendModel";

export class FriendServiceImpl implements FriendServices {
  async getFriends(): Promise<MyFriendModel[]> {
    return await MyFriendModel.findAll({
      order: [["id", "ASC"]]
    });
  }

  async getFriendById(id: number): Promise<MyFriendModel | null> {
    return await MyFriendModel.findByPk(id);
  }

  async createFriend(data: {
    name: string;
    gender: string;
  }): Promise<MyFriendModel> {
    return await MyFriendModel.create(data as any);
  }

  async updateFriend(
    id: number,
    data: {
      name?: string;
      gender?: string;
    }
  ): Promise<MyFriendModel | null> {
    const friend = await MyFriendModel.findByPk(id);

    if (!friend) return null;

    await friend.update(data);
    return friend;
  }

  async deleteFriend(id: number): Promise<boolean> {
    const friend = await MyFriendModel.findByPk(id);

    if (!friend) return false;

    await friend.destroy();
    return true;
  }
}