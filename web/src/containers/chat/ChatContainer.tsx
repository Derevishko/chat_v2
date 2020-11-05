import Chat from "../../components/chat/Chat";
import ChatService from "../../services/ChatService";
import React from "react";
import config from "../../config";

interface Props {
  chat?: App.IChat;
}
interface State {
  messages: Array<any>;
  loading: boolean;
  previousChat?: App.IChat;
}

class ChatContainer extends React.Component<Props, State> {
  private ws?: WebSocket;
  private chatService: ChatService;
  constructor(props: Props) {
    super(props);
    this.chatService = new ChatService();
    this.state = {
      messages: [],
      loading: false,
    };
  }

  public componentDidMount() {
    this.connectToWs();
    this.getMessages();
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.chat !== prevProps.chat) {
      this.getMessages();
    }
  }

  private get loading(): boolean {
    return this.state.loading;
  }
  private set loading(loading: boolean) {
    this.setState({ loading });
  }

  private getMessages() {
    if (!this.props.chat) return;
    this.loading = true;
    let isRestart = this.state.previousChat === this.props.chat;
    this.chatService
      .getMessages({
        chatId: this.props.chat._id,
        skip: isRestart ? this.state.messages.length : 0,
        limit: 20,
      })
      .then((messages) => {
        this.setState({
          previousChat: this.props.chat,
          messages: isRestart ? messages.concat(this.state.messages) : messages,
        });
      })
      .finally(() => {
        this.loading = false;
      });
  }
  private handleSend(text: string) {
    if (!this.props.chat) return;
    this.chatService
      .sendMessage({ chatId: this.props.chat._id, text })
      .then((v) => console.log(v));
  }

  private connectToWs() {
    this.ws = new WebSocket(config.wsBaseUrl + "/chat/messages");
    this.ws.onopen = this.hanldeOpen.bind(this);
    this.ws.onmessage = this.hanldeMessage.bind(this);
    this.ws.onclose = this.hanldeClose.bind(this);
  }
  private hanldeOpen(event: Event) {
    console.log("open");
  }
  private hanldeMessage(event: MessageEvent) {
    this.setState({
      messages: this.state.messages.concat(JSON.parse(event.data)),
    });
  }
  private hanldeClose(event: Event) {
    console.log("close");
  }

  public render() {
    return (
      <Chat
        onSend={this.handleSend.bind(this)}
        messages={this.state.messages}
      />
    );
  }
}
export default ChatContainer;
