import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {GridList, GridTile} from 'material-ui/GridList';

import Member from './Member';

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

const MemberList = () => (
  <GridList
    className="grid-list"
    cols={3}
    cellHeight={100}
    padding={40}
    style={styles.gridList}>

    <GridTile
      className="grid-tile"
      key={1}
      title=""
      titleBackground="none"
      cols={1}
      rows={1}>
      <Member displayName="Thanh" profilePictureId="http://www.kodeinfo.com/admin/assets/img/avatars/default-avatar.jpg" />
    </GridTile>
  </GridList>
)

export default MemberList;
