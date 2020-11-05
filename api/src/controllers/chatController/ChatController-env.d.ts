declare namespace ChatControllerNamespace {
  type TGetChatsList = App.TControllerResponse<{
    chats: Array<App.IChat>;
  }>;
  type TCreateChat = App.TControllerResponse<{
    chat: App.IChat;
  }>;

  type TAddMessageData = {
    text: string;
    chatId: string;
  };
  type TAddMessageResponse = App.TControllerResponse<{
    message: App.IMessage;
  }>;
  type TGetMessagesResponse = App.TControllerResponse<{
    messages: Array<App.IMessage>;
  }>;
  type TSubscribeOnChat = App.TControllerResponse;
  type TLeaveFromChat = App.TControllerResponse;
}
