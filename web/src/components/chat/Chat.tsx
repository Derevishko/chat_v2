import "./Chat.scss";

import ChatMessagesList from "./chatMessagesList/ChatMessagesList";
import MessageConstructor from "../messageConstructor/MessageConstructor";
import React from "react";

interface Props {
  messages: Array<App.IMessage>;
  onSend: (text: string) => void;
}
interface State {}

class Chat extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  public render() {
    return (
      <div className="chat">
        <ChatMessagesList messages={this.props.messages} />
        <MessageConstructor onSend={this.props.onSend} />
      </div>
    );
  }
}
export default Chat;
