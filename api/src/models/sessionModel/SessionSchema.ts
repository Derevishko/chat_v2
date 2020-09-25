import * as mongoose from "mongoose";

const SessionSchema: TSessionSchema = new mongoose.Schema({
  token: { type: String },
  userId: { type: mongoose.Types.ObjectId },
  created: { type: Date, default: Date.now },
});

export type TSessionSchema = mongoose.Schema<{
  token: string;
  userId: mongoose.Types.ObjectId;
  created?: Date;
}>;
export default SessionSchema;
