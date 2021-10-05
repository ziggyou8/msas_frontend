import React from "react";

class ChangingProgressProvider extends React.Component {
  

  state = {
    valuesIndex: 0
  };

  componentDidMount() {
      this.setState({
        valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length
      });
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ChangingProgressProvider;