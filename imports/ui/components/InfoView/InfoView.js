import React, {Component, PropTypes} from 'react';

export default class InfoView extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: "Plain text"
    }

  }

  updateValue(value) {
    console.log(this, value)
    this.setState({value})
  }

  render() {
    return (
      <div>View Info</div>
    )
  }

}
