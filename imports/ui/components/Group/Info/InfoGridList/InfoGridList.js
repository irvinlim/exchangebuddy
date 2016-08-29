import React from 'react';
import { browserHistory }from 'react-router';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

import * as Colors from 'material-ui/styles/colors';
import * as IconsHelper from '../../../../../util/icons';
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
    <Paper zDepth={2}>
      <GridTile
        className="grid-tile"
        title={ item.section.label }
        subtitle="132 likes, 55 shares"
        cols={ item.isFeatured ? 2 : 1 }
        rows={ item.isFeatured ? 2 : 1 }
        onClick={ goToInfoPg }
        style={{
          backgroundImage: `url('${InfoHelper.getImageUrl(item, 300)}')`
        }}
        actionIcon={ <IconButton>{ IconsHelper.icon("open_in_new", { color: Colors.grey50 }) }</IconButton> } />
    </Paper>
  );
};

const InfoGridList = ({ about, group, title, items, isMobile }) => (
  <div className="grid-list-container">
    <h3 className="pinline"><span>About { title }</span></h3>
    <p className="small-text" style={{ textAlign: 'center' }}>Click to view more information about each section.</p>

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