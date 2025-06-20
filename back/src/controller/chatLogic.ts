// controller/chatLogic.ts (create this if it doesn't exist)

import { ChatModel } from "../model/Chat";

export const saveChatToDB = async ({
  id,
  user,
  text,
  profileimage,
  roomId,
  createdAt,
  receiver,
}: {
  id: string;
  user: string; // sender's userId
  text: string;
  profileimage: string | null;
  roomId: string;
  createdAt: string;
  receiver: string;
}) => {
  const saved = await new ChatModel({
    sender: user,
    receiver,
    text,
    profileimage,
    roomId,
    createdAt,
  }).save();
  return saved;
};
