import React from 'react';
import Header from '../../components/Header'

const Group = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
  },

  render() {
    return (
      <div>
        <Header />
        <div id="group-container">
          { this.props.children }
        </div>
      </div>
    );
  }
})

export default Group;
