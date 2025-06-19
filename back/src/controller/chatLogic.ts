// controller/chatLogic.ts (create this if it doesn't exist)

import { ChathistoryModel } from "../model/ChatHistory";

export const saveChatToDB = async ({
  id,
  user,
  text,
  profileimage,
  roomId,
  createdAt,
}: {
  id: string;
  user: string;
  text: string;
  profileimage: string | null;
  roomId: string;
  createdAt: string;
}) => {
  const saved = await new ChathistoryModel({
    id,
    user,
    text,
    profileimage,
    roomId,
    createdAt,
  }).save();
  return saved;
};
