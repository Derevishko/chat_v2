import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";

import authRouter from "./routes/auth";

const config = mongoose.connect("mongodb://localhost/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendStatus(200);
});
app.use("/auth", authRouter);

app.listen(3000);
