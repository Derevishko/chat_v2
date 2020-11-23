import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";

import Logo from "./components/logo/Logo";
// import Header from "./components/header/Header";
import React from "react";
import { Route } from "react-router-dom";
import Sider from "antd/lib/layout/Sider";
import View from "./components/view/View";

interface Props {}
interface State {}

class App extends React.Component<Props, State> {
  public render() {
    return (
      <Layout>
        <Header>
          <Logo />
        </Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>
            <View />
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default App;
