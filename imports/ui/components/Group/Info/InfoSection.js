import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { browserHistory }from 'react-router'

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

const InfoSection=({ group, items }) => (
  <GridList
    className="grid-list"
    cols={3}
    cellHeight={210}
    padding={10}
    style={styles.gridList}>

    {items.map((tile, idx) => {
      const goToInfoPg = () => { browserHistory.push(`/group/${group.id}/info/${tile.id}`) };
      return(
      <Card className="grid-tile-container">
        <GridTile
          className="grid-tile"
          key={idx}
          title={tile.sectionLabel}
          cols={tile.featured ? 2 : 1}
          rows={tile.featured ? 2 : 1}
          style={{background: "url("+tile.img +") center center / cover no-repeat", height: "200px", cursor: "pointer"}}
          onClick={ goToInfoPg }>
        </GridTile>
        <CardActions>
          <FlatButton label="Share" />
          <small style={{float: "right", marginTop:"6px"}}>100 SHARES</small>
        </CardActions>
      </Card>
      )
    })}

  </GridList>
);

export default InfoSection;
