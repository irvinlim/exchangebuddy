import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const PrevButton = (props) => (
  <FlatButton
    label="Back"
    disableTouchRipple={true}
    disableFocusRipple={true}
    onTouchTap={this.handlePrev}
    {...props} />
);

export default PrevButton;
