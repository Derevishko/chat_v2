import * as mongoose from "mongoose";

import UserSchema from "./UserSchema";

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
