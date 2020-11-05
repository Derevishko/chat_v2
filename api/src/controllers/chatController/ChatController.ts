import ChatMessageModel from "../../models/chatMessageModel/ChatMessageModel";
import ChatModel from "../../models/chatModel/ChatModel";
import UserModel from "../../models/userModel/UserModel";
import { response } from "express";

class ChatController {
  private onSendMessageHandlers: Array<(message: App.IMessage) => void>;

  constructor() {
    new ChatModel({ name: "test chat" }).save().catch((e) => e);
    this.onSendMessageHandlers = [];
  }
  public subscribe(handler: (message: App.IMessage) => void): () => void {
    this.onSendMessageHandlers.push(handler);
    return () => {
      this.onSendMessageHandlers = this.onSendMessageHandlers.filter(
        (e) => e !== handler
      );
    };
  }

  public async createChat(
    user: App.IUser,
    name: string
  ): ChatControllerNamespace.TCreateChat {
    const chat = new ChatModel({ name });
    return chat
      .save()
      .then((data) => {
        return { status: 201, data: { chat: data.toObject() } };
      })
      .catch((err: Error) => {
        return { status: 400, data: { error: err.message } };
      });
  }

  public async getChatsList(
    skip: number = 0,
    limit: number = 50,
    self: boolean = false
  ): ChatControllerNamespace.TGetChatsList {
    return await ChatModel.find({}, {}, { sort: "cerated", skip, limit })
      .then((response) => {
        return {
          data: { chats: response.map((e) => e.toObject()) },
          status: 200,
        };
      })
      .catch(() => ({
        status: 400,
        data: { error: "Error in get chats list" },
      }));
  }

  public async addMessage(
    user: App.IUser,
    data: ChatControllerNamespace.TAddMessageData
  ): ChatControllerNamespace.TAddMessageResponse {
    try {
      const u = await UserModel.findOne({ login: "test" }).then((r) =>
        r.toObject()
      );
      const messageId = await new ChatMessageModel({
        text: data.text,
        chatId: data.chatId,
        user: u._id,
      })
        .save()
        .then((response) => {
          return response._id;
        });

      const message = await ChatMessageModel.findById(messageId)
        .populate("user", { _id: true, login: true })
        .then((message) => message.toObject());

      this.onSendMessageHandlers.forEach((e) => e(message));
      return {
        status: 200,
        data: {
          message,
        },
      };
    } catch (error) {
      return {
        status: 400,
        data: { error: error.message },
      };
    }
  }

  public async getMessages(
    chatId: string,
    skip: number = 0,
    limit: number = 50
  ): ChatControllerNamespace.TGetMessagesResponse {
    try {
      const messages: Array<App.IMessage> = await ChatMessageModel.find(
        { chatId },
        {},
        { sort: { created: -1 }, skip, limit }
      )

        .populate("user", { _id: true, login: true })
        .then((response) => {
          return response.map((e) => e.toObject());
        })
        .catch((err) => {
          throw err;
        });

      return {
        status: 200,
        data: {
          messages,
        },
      };
    } catch (error) {
      return {
        status: 400,
        data: { error: error.message },
      };
    }
  }

  public async subscribeOnChat(
    user: App.IUser,
    chat: string
  ): ChatControllerNamespace.TSubscribeOnChat {
    const model = new ChatMessageModel({ chat, user: user._id });
    return model
      .save()
      .then(() => {
        return { status: 200, data: undefined };
      })
      .catch(() => {
        return { status: 400, data: { error: "Error in subscribe" } };
      });
  }
  public async leaveFromChat(
    user: App.IUser,
    chat: string
  ): ChatControllerNamespace.TLeaveFromChat {
    return ChatMessageModel.updateOne(
      { user: user._id, chat },
      { status: false }
    )
      .then(() => {
        return { status: 200, data: undefined };
      })
      .catch(() => {
        return { status: 400, data: { error: "Error in leave" } };
      });
  }
}

export default ChatController;
