import { Router } from "express";
import { FriendController } from "../controllers/FriendController";

const router = Router();

router.get("/api/friends", FriendController.getFriends);
router.get("/api/friends/:id", FriendController.getFriendById);
router.post("/api/friends", FriendController.createFriend);
router.put("/api/friends/:id", FriendController.updateFriend);
router.delete("/api/friends/:id", FriendController.deleteFriend);

export default router;