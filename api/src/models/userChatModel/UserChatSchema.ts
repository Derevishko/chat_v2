import * as mongoose from "mongoose";

import ChatMessageModel from "../chatMessageModel/ChatMessageModel";
import ChatModel from "../chatModel/ChatModel";
import UserModel from "../userModel/UserModel";

const UserChatSchema: TUserChatSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: UserModel },
  chat: { type: mongoose.Types.ObjectId, required: true, ref: ChatModel },
  lastSawMessage: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: ChatMessageModel,
  },
  status: { type: Boolean, default: true },
  created: { type: Date, default: Date.now() },
});

export type TUserChatSchema = mongoose.Schema<App.IUserChat>;
export default UserChatSchema;
