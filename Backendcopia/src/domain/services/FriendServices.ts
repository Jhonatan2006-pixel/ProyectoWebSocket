import { MyFriendModel } from "../../infrastructure/models/MyFriendModel";

export interface FriendServices {
  getFriends(): Promise<MyFriendModel[]>;

  getFriendById(id: number): Promise<MyFriendModel | null>;

  createFriend(data: {
    name: string;
    gender: string;
  }): Promise<MyFriendModel>;

  updateFriend(
    id: number,
    data: {
      name?: string;
      gender?: string;
    }
  ): Promise<MyFriendModel | null>;

  deleteFriend(id: number): Promise<boolean>;
}