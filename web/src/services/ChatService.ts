import Axios, { AxiosError, AxiosResponse } from "axios";

import config from "../config";

class ChatService {
  public getChatsList(
    params: App.IPaginationParams
  ): Promise<Array<App.IChat>> {
    return Axios.get("/chat", {
      params,
    })
      .then((response: AxiosResponse<{ chats: Array<App.IChat> }>) => {
        return response.data.chats;
      })
      .catch((error: AxiosError<{ error: string }>) => {
        throw error.response?.data.error || config.defaultError;
      });
  }

  public sendMessage(body: { chatId: string; text: string }) {
    return Axios.post("/chat/message", body)
      .then(() => true)
      .catch(() => false);
  }
  public getMessages(
    params: App.IPaginationParams & {
      chatId: string;
    }
  ): Promise<Array<App.IMessage>> {
    return Axios.get("/chat/messages", {
      params,
    })
      .then((response: AxiosResponse<{ messages: Array<App.IMessage> }>) => {
        return response.data.messages;
      })
      .catch((error: AxiosError<{ error: string }>) => {
        throw error.response?.data.error || config.defaultError;
      });
  }
}

export default ChatService;
