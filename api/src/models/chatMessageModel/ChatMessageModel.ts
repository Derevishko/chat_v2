import * as mongoose from "mongoose";

import ChatMessageSchema from "./ChatMessageSchema";

const ChatMessageModel = mongoose.model("chatMessage", ChatMessageSchema);

export default ChatMessageModel;