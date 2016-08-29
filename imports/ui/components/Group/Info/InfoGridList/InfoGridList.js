import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import { browserHistory }from 'react-router';

import * as InfoHelper from '../../../../../util/info';

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

const GridItem = ({ group, item }) => {
  const goToInfoPg = () => { browserHistory.push(`/group/${group.id}/info/${item.id}`) };

  return (
    <Card className="grid-tile-container">
      <GridTile
        className="grid-tile"
        title={ item.section.label }
        cols={ item.isFeatured ? 2 : 1 }
        rows={ item.isFeatured ? 2 : 1 }
        style={{ background: `url('${ InfoHelper.getImageUrl(item) }') center center / cover no-repeat`, height: 200, cursor: "pointer" }}
        onClick={ goToInfoPg } />

      <CardActions>
        <small style={{ marginTop: 6 }}>100 SHARES</small>
      </CardActions>
    </Card>
  );
};

const InfoGridList = ({ about, group, title, items, isMobile }) => (
  <div className="grid-list-container">
    <h3 className="pinline"><span>About { title }</span></h3>

    <GridList
      className="grid-list"
      cols={ isMobile ? 2 : 3 }
      cellHeight={210}
      padding={10}
      style={styles.gridList}>

      { items.map((item, idx) => <GridItem key={idx} group={group} item={item} />) }

    </GridList>
  </div>
);

export default InfoGridList;
