import "./ChatMessage.scss";

import React from "react";
import Time from "../../../utils/time/Time";

interface Props {
  message: App.IMessage;
}
interface State {}

class ChatMessage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  public render() {
    return (
      <div className="chat-message">
        <div className="head">
          <div className="author">{this.props.message.user.login}</div>
          <div className="created">
            {Time.beautifyDateTime(this.props.message.created)}
          </div>
        </div>
        <div className="text">{this.props.message.text}</div>
      </div>
    );
  }
}
export default ChatMessage;
