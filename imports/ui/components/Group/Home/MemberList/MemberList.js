import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import { ListItem } from 'material-ui/List';

import { getAvatar } from '../../../../../util/user';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  gridList: {
    width: "100%",
    margin: "0 auto",
  },
};

const MemberTile = ({ user }) => (
  <Col xs={12} sm={6} md={4}>
    <ListItem primaryText={ user.displayName } secondaryText={ user.homeUniversity.name } leftAvatar={ getAvatar(user, 40) } />
  </Col>
);

const MemberList = ({ groupUsers, isMobile }) => (
  <Grid>
    <Row>

      { groupUsers.map((user, idx) => <MemberTile key={ idx } user={ user } />) }

    </Row>
  </Grid>
)

export default MemberList;
