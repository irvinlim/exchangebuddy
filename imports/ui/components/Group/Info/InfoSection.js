import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: "100%",
    height: 450,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

const InfoSection=({ items }) => (
  <GridList
    className="grid-list"
    cols={3}
    cellHeight={210}
    padding={10}
    paddingTop={57}
    style={styles.gridList}
  >
    {items.map((tile, idx) => (
      <Card className="grid-tile-container">
        <GridTile
          className="grid-tile"
          key={idx}
          title={tile.sectionLabel}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          actionPosition="left"
          titlePosition="top"
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={tile.featured ? 2 : 1}
          rows={tile.featured ? 2 : 1}
          style={{background: "url("+tile.img +") no-repeat center center", height: "200px"}}
        >
        </GridTile>
        <CardActions>
          <FlatButton label="Share" />
          <small style={{float: "right", marginTop:"6px"}}>100 SHARES</small>
        </CardActions>
      </Card>
    ))}
  </GridList>
)

export default InfoSection;
