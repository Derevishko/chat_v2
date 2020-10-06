import "./ChatMessagesList.scss";

import ChatMessage from "../chatMessage/ChatMessage";
import React from "react";

interface Props {
  messages: Array<App.IMessage>;
}
interface State {}

class ChatMessagesList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  public render() {
    return (
      <div className="chat-messages-list">
        {this.props.messages.map((message) => (
          <ChatMessage key={message._id} message={message} />
        ))}
      </div>
    );
  }
}
export default ChatMessagesList;
