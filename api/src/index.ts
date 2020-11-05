import * as bodyParser from "body-parser";
import * as express from "express";
import * as expressWs from "express-ws";
import * as mongoose from "mongoose";

import authRouter from "./routes/auth";
import chatRouter from "./routes/chat";
import config from "./config";

// до импорта роутеров
const app = express();
expressWs(app);
const testRouter = express.Router();

mongoose.connect("mongodb://localhost/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(bodyParser.json());

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.options("/*", (req, res) => res.sendStatus(200));
app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/test", testRouter);

app.listen(config.port, "0.0.0.0", () =>
  console.log(`run on port ${config.port}`)
);
