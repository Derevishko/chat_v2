import * as express from "express";
import * as expressWs from "express-ws";

import AuthController from "../controllers/authController/AuthController";
import ChatController from "../controllers/chatController/ChatController";

const authController = new AuthController();

const app = express();
expressWs(app);

const chatController = new ChatController();

const chatRouter = express.Router();

chatRouter.post(
  "/message",
  authController.auth,
  async (req: TAddMessageReq, res) => {
    const response = await chatController.addMessage(req.user, req.body);
    // @ts-ignore
    res.status(response.status).send(response.data);
  }
);

chatRouter.ws("/messages", (ws, req) => {
  ws.on("message", function (msg) {
    ws.send(msg);
  });

  const unsubscribe = chatController.subscribe((message) => {
    console.log(message);
    ws.send(JSON.stringify(message));
  });
  ws.on("close", function (msg) {
    unsubscribe();
  });
  ws.on("open", (event) => {
    console.log("open");
  });
});

chatRouter.get("/messages", async (req: TGetMessagesListReq, res) => {
  const response = await chatController.getMessages(
    req.query.chatId,
    +req.query.skip,
    +req.query.limit
  );
  res.status(response.status).send(response.data);
});

chatRouter.get("/", async (req: TGetChatsList, res) => {
  const response = await chatController.getChatsList(
    +req.query.skip,
    +req.query.limit
  );
  res.status(response.status).send(response.data);
});

chatRouter.post("/", authController.auth, async (req: TCreateChat, res) => {
  const response = await chatController.createChat(req.user, req.body.name);
  res.status(response.status).send(response.data);
});

chatRouter.post(
  "/subscribe/:chat",
  authController.auth,
  async (req: TSubscribeOnChatReq, res) => {
    const response = await chatController.subscribeOnChat(
      req.user,
      req.params.chat
    );
    res.status(response.status).send(response.data);
  }
);

chatRouter.post("/leave/:chat", async (req: TLeaveFromChatReq, res) => {
  const response = await chatController.leaveFromChat(
    req.user,
    req.params.chat
  );
  res.status(response.status).send(response.data);
});

export default chatRouter;

type TAddMessageReq = express.Request<
  {},
  App.IControllerResponseData<{ message: App.IMessage }>,
  {
    text: string;
    chatId: string;
  },
  {}
> & { user: App.IUser };

type TGetChatsList = express.Request<
  {},
  App.IControllerResponseData<{ chats: Array<App.IChat> }>,
  {},
  { skip: string; limit: string }
>;
type TCreateChat = express.Request<
  {},
  App.IControllerResponseData<{ chat: App.IChat }>,
  { name: string },
  {}
> & { user: App.IUser };

type TGetMessagesListReq = express.Request<
  {},
  App.IControllerResponseData<{ messages: Array<App.IMessage> }>,
  {},
  { skip: string; limit: string; chatId: string }
>;

type TSubscribeOnChatReq = express.Request<
  { chat: string },
  App.IControllerResponseData,
  {},
  {}
> & { user: App.IUser };
type TLeaveFromChatReq = express.Request<
  { chat: string },
  App.IControllerResponseData,
  {},
  {}
> & { user: App.IUser };
