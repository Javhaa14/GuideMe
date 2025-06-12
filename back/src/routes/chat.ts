import { saveChatMessage } from "../controller/chat";
import { Onlinerouter } from "./online";

Onlinerouter.post("/chat", saveChatMessage);
