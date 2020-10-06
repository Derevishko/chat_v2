import Axios from "axios";

class ChatService {
  public sendMessage(chatId: string, text: string) {
    return Axios.post("/chat/message", {
      chatId,
      text,
    });
  }
  public getMessages(chatId: string, skip: number, limit: number) {
    return Axios.get("/chat/messages", {
      params: {
        chatId,
        skip,
        limit,
      },
    });
  }
}

export default ChatService;
