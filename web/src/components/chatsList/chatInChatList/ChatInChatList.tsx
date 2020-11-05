import "./ChatInChatList.scss";

import React from "react";

interface Props {
  chat: App.IChat;
  onClick: (chat: App.IChat) => void;
  className?: string;
}
interface State {}

class ChatInChatList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public get className(): string {
    return this.props.className
      ? `${this.props.className} chat-in-chat-list`
      : "chat-in-chat-list";
  }

  private handleClick() {
    this.props.onClick(this.props.chat);
  }

  public render() {
    return (
      <div className={this.className} onClick={this.handleClick.bind(this)}>
        <div className="chat-in-chat-list__name">{this.props.chat.name}</div>
      </div>
    );
  }
}
export default ChatInChatList;
