import { AxiosResponse } from "axios";
import Chat from "../../components/chat/Chat";
import ChatService from "../../services/ChatService";
import React from "react";
import config from "../../config";

interface Props {
  chatId: string;
}
interface State {
  messages: Array<any>;
}

class ChatContainerContainer extends React.Component<Props, State> {
  private ws?: WebSocket;
  private chatService: ChatService;
  constructor(props: Props) {
    super(props);
    this.chatService = new ChatService();
    this.state = {
      messages: [],
    };
  }

  public componentDidMount() {
    this.connectToWs();
    this.getMessages();
  }

  private getMessages() {
    this.chatService
      .getMessages(this.props.chatId, this.state.messages.length, 20)
      .then((response: AxiosResponse<{ messages: Array<App.IMessage> }>) => {
        this.setState({
          messages: response.data.messages.concat(this.state.messages),
        });
      });
  }
  private handleSend(text: string) {
    this.chatService
      .sendMessage(this.props.chatId, text)
      .then((v) => console.log(v))
      .catch((e) => console.error(e));
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
export default ChatContainerContainer;
