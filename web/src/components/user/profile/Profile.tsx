import React from 'react';
import './Profile.scss';

interface Props {className?: string}
interface State {}

class Profile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public get className(): string {
    return this.props.className ? `${this.props.className} profile` : "profile";
  }

  public render () {
    return <div className={this.className}></div>;
  }
}
export default Profile;