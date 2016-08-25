import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import * as ImagesHelper from '../../../../util/images';
import * as IconsHelper from '../../../../util/icons';
import * as UniversityHelper from '../../../../util/university';
import { FullWidthAvatar } from '../../../../util/avatar';

export default class Member extends React.Component {
  render() {
    return (
      <div style={{ float: "left", width: "300px" }}>
        <div style={{ float: "left", marginRight: 25 }}>
          <FullWidthAvatar size={80} src={ this.props.profilePictureId } />
        </div>
        <div style={{ lineHeight: "80px", verticalAlign: "middle" }}>
          <b>{this.props.displayName}</b>
        </div>
      </div>
    )
  }
}
