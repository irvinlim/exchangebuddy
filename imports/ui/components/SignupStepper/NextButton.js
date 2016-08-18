import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const NextButton = (props) => (
  <RaisedButton
    disableTouchRipple={true}
    disableFocusRipple={true}
    primary={true}
    type="submit"
    style={{ marginRight: 12 }}
    {...props} />
);

export default NextButton;
