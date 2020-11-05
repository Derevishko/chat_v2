import * as mongoose from "mongoose";

const ChatSchema: TChatSchema = new mongoose.Schema({
  name: { type: String, minlength: 1, maxlength: 64, unique: true },
});

export type TChatSchema = mongoose.Schema<App.IChat>;
export default ChatSchema;
