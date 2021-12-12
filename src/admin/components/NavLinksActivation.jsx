import { Link } from "react-router-dom";
import React from "react";
import { defaults } from "react-chartjs-2";
class MyLink extends React.Component {
  render() {
    if (this.props.route === this.props.to) {
      return <span>{this.props.linktext}</span>;
    }
    return <Link to={this.props.to}>{this.props.linktext}</Link>;
  }
}

export default MyLink;
