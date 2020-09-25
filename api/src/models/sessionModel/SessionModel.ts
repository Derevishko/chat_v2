import * as mongoose from "mongoose";

import SessionSchema from "./SessionSchema";

const SessionModel = mongoose.model("session", SessionSchema);

export default SessionModel;
