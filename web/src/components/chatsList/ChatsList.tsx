import "./ChatsList.scss";

import ChatInChatList from "./chatInChatList/ChatInChatList";
import React from "react";

interface Props {
  chats: Array<App.IChat>;
  onSelectChat: (chat: App.IChat) => void;
  activeChat?: App.IChat;
  className?: string;
}
interface State {}

class ChatsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public get className(): string {
    return this.props.className
      ? `${this.props.className} chats-list`
      : "chats-list";
  }

  public render() {
    return (
      <div className={this.className}>
        {this.props.chats.map((chat) => (
          <ChatInChatList
            key={chat._id}
            chat={chat}
            className={this.props.activeChat === chat ? "active" : undefined}
            onClick={this.props.onSelectChat}
          />
        ))}
      </div>
    );
  }
}
export default ChatsList;
