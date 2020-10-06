import ChatContainerContainer from "./controllers/chatContainer/ChatContainerContainer";
import React from "react";

interface Props {}
interface State {}

class App extends React.Component<Props, State> {
  public render() {
    return (
      <>
        <div className="test-chat">
          <ChatContainerContainer chatId="5f71bb59c896a82e740411fc" />
        </div>
      </>
    );
  }
}

export default App;
