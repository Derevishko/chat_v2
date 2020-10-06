import "./MessageConstructor.scss";

import React, { SyntheticEvent } from "react";

interface Props {
  onSend: (text: string) => void;
}
interface State {
  text: string;
}

class MessageConstructor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { text: "" };
  }

  private handleChangeText(event: SyntheticEvent<HTMLTextAreaElement>) {
    this.setState({ text: event.currentTarget.value });
  }
  private send() {
    this.props.onSend(this.state.text);
    this.setState({ text: "" });
  }
  private hanldeClickButtonSend() {
    if (this.state.text) {
      this.send();
    }
  }
  private handleKeyDown(
    event: SyntheticEvent<HTMLTextAreaElement, KeyboardEvent>
  ) {
    if (event.nativeEvent.key === "Enter" && !event.nativeEvent.shiftKey) {
      event.preventDefault();
      this.hanldeClickButtonSend();
    }
  }

  public render() {
    return (
      <div className="message-constructor">
        <textarea
          value={this.state.text}
          onChange={this.handleChangeText.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
        />
        <div className="buttons">
          <button
            className="send"
            onClick={this.hanldeClickButtonSend.bind(this)}
          >
            send
          </button>
        </div>
      </div>
    );
  }
}
export default MessageConstructor;
