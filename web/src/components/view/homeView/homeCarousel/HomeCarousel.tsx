import "./HomeCarousel.scss";

import { Carousel } from "antd";
import React from "react";

interface Props {
  className?: string;
}
interface State {}

class HomeCarousel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public get className(): string {
    return this.props.className
      ? `${this.props.className} home-carousel`
      : "home-carousel";
  }

  public render() {
    return (
      <div className={this.className}>
        <Carousel autoplay>
          <div className="carousel-item">
            <h3>Hello</h3>
          </div>
          <div className="carousel-item">
            <h3>U are ready?</h3>
          </div>
          <div className="carousel-item">
            <h3>Join for us!!!</h3>
          </div>
        </Carousel>
      </div>
    );
  }
}
export default HomeCarousel;
