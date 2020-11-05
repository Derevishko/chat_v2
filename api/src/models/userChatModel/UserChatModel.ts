import * as mongoose from "mongoose";

import UserChatSchema from "./UserChatSchema";

const UserChatModel = mongoose.model("userChat", UserChatSchema);

export default UserChatModel;