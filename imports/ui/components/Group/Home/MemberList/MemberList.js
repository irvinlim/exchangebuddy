import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import { GridList, GridTile } from 'material-ui/GridList';
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
    marginBottom: 24,
  },
};

const MemberTile = ({ idx, user }) => (
  <GridTile key={ idx } className="grid-tile" title="" titleBackground="none" cols={1} rows={1}>
    <ListItem primaryText={ user.displayName } leftAvatar={ getAvatar(user, 40) } />
  </GridTile>
);

const MemberList = ({ groupUsers }) => (
  <GridList
    className="member-list"
    cols={3}
    cellHeight={100}
    padding={40}
    style={ styles.gridList }>

    { groupUsers.map((user, idx) => <MemberTile idx={ idx } user={ user } />) }

  </GridList>
)

export default MemberList;
