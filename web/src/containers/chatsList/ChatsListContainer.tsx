import ChatContainer from "../chat/ChatContainer";
import ChatService from "../../services/ChatService";
import ChatsList from "../../components/chatsList/ChatsList";
import React from "react";

interface Props {}
interface State {
  loading: boolean;
  chats: Array<App.IChat>;
  activeChat?: App.IChat;
}

class ChatsListContainer extends React.Component<Props, State> {
  private chatService: ChatService;
  constructor(props: Props) {
    super(props);
    this.chatService = new ChatService();
    this.state = {
      loading: false,
      chats: [],
    };
  }

  public componentDidMount() {
    this.getChats();
  }

  private get loading(): boolean {
    return this.state.loading;
  }
  private set loading(loading: boolean) {
    this.setState({ loading });
  }

  private getChats() {
    this.loading = true;
    this.chatService
      .getChatsList({ limit: 50, skip: 0 })
      .then((chats) => {
        this.setState({ chats });
      })
      .catch((error: string) => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private handleSelectChat(activeChat: App.IChat) {
    this.setState({ activeChat });
  }

  public render() {
    return (
      <>
        <ChatsList
          chats={this.state.chats}
          activeChat={this.state.activeChat}
          onSelectChat={this.handleSelectChat.bind(this)}
          className={this.state.loading ? "loading" : undefined}
        />
        <ChatContainer chat={this.state.activeChat} />
      </>
    );
  }
}
export default ChatsListContainer;
