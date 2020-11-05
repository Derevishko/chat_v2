import * as mongoose from "mongoose";

import ChatSchema from "./ChatSchema";

const ChatModel = mongoose.model("chat", ChatSchema);

export default ChatModel;