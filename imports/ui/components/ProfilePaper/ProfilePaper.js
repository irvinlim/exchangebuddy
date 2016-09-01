import React, {Component, PropTypes} from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// import { GridList, GridTile } from 'material-ui/GridList';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import Markdown from 'react-markdown';
// import Dialog from 'share-dialog';
// import { browserHistory } from 'react-router';

// import * as IconsHelper from '../../../../util/icons';
// import * as InfoHelper from '../../../../util/info';
// import * as ImagesHelper from '../../../../util/images';
// import * as Colors from 'material-ui/styles/colors';

// const FacebookDialog = Dialog.facebook(Meteor.settings.public.Facebook.appId, "http://app.exchangebuddy.com", "http://app.exchangebuddy.com");

const table_style = {
  width: "90%",
  tableLayout: "fixed"
}

const table_header_style = {
  fontSize: "medium",
  fontWeight: "bold",
  width: "35%"
}

const table_body_style = {
  fontSize: "medium",
  fontWeight: "light",
  color: "gray",
  width: "65%"
}

export default class ProfilePaper extends Component {
  render() {
    return (
      <Paper className="profile-paper" zDepth={2}>
        <Grid>
          <Row id="profile-paper">
            <Col xs={12} md={3} id="user-image">
              <p>Facebook avatar goes here</p>
            </Col>
            <Col xs={12} md={7} id="user-info">
              <h1>Chi Thanh</h1>
              <Table selectable={false} style={table_style}>
                <TableBody displayRowCheckbox={false}>
                  <TableRow displayBorder={false}>
                    <TableRowColumn style={table_header_style}>HOME UNI</TableRowColumn>
                    <TableRowColumn style={table_body_style}>NUS</TableRowColumn>
                  </TableRow>
                  <TableRow displayBorder={false}>
                    <TableRowColumn style={table_header_style}>EXCHANGE UNI</TableRowColumn>
                    <TableRowColumn style={table_body_style}>NTU</TableRowColumn>
                  </TableRow>
                  <TableRow displayBorder={false}>
                    <TableRowColumn style={table_header_style}>EMAIL</TableRowColumn>
                    <TableRowColumn style={table_body_style}>lamchithanh1997@gmail.com</TableRowColumn>
                  </TableRow>
                  <TableRow displayBorder={false}>
                    <TableRowColumn style={table_header_style}>PHONE</TableRowColumn>
                    <TableRowColumn style={table_body_style}>(+65) 8443 1981</TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </Paper>
    )
  }
}
