import * as mongoose from "mongoose";

import UserModel from "../userModel/UserModel";
import UserSchema from "../userModel/UserSchema";

const ChatMessageSchema: TChatMessageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Types.ObjectId, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: UserModel },
  text: { type: String, maxlength: 512 },
  created: { type: Date, default: Date.now(), required: true },
});

ChatMessageSchema.pre("find", (next) => {
  next();
});

type TChatMessageSchemaMethods = {
  getUser: () => void;
};
export type TChatMessageSchema = mongoose.Schema<
  App.IMessage & TChatMessageSchemaMethods
>;
export default ChatMessageSchema;
