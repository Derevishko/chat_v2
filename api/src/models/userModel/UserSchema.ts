import * as mongoose from "mongoose";

const UserSchema: TUserSchema = new mongoose.Schema({
  login: { type: String, min: 3, max: 32 },
  password: { type: String, minlength: 64, maxlength: 64 },
  online: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  registrationDate: { type: Date, default: Date.now },
});

export type TUserSchema = mongoose.Schema<App.IUser>;
export default UserSchema;
