import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Link from '../Link';

import * as UserHelper from '../../../util/user';

const table_style = {
  width: "90%",
  tableLayout: "fixed"
};

const table_header_style = {
  fontSize: "medium",
  fontWeight: 500,
  width: "35%"
};

const table_body_style = {
  fontSize: "medium",
  fontWeight: "light",
  color: "gray",
  width: "65%"
};

const text_header_style = {
  fontSize: "-webkit-xxx-large",
  fontWeight: 300,
  textAlign: "left",
  paddingLeft: "4%"
};

export default class ProfilePaper extends React.Component {
  render() {
    const { user, userExchangeUniversities, userHomeUniversity } = this.props;

    return (
      <Paper className="profile-paper" zDepth={2} style={{ padding: 40 }}>
        <Grid>
          <Row id="profile-paper">
            <Col xs={12} md={3} id="user-image">
              { UserHelper.getAvatar(user, 300, { height: "auto", width: "100%" }) }
            </Col>

            <Col xs={12} md={7} id="user-info">
              <h1 style={text_header_style}>{ user.displayName }</h1>
              <div><hr style={{ width: "85%", paddingLeft: "4%" }}/></div>
              <Table selectable={false} style={table_style}>
                <TableBody displayRowCheckbox={false}>

                  <TableRow displayBorder={false}>
                    <TableRowColumn style={table_header_style}>HOME UNI</TableRowColumn>
                    <TableRowColumn style={table_body_style}>
                      { userHomeUniversity.name }
                    </TableRowColumn>
                  </TableRow>

                  <TableRow displayBorder={false}>
                    <TableRowColumn style={table_header_style}>ON EXCHANGE TO</TableRowColumn>
                    <TableRowColumn style={table_body_style}>
                      { userExchangeUniversities.map(uni => <p>{ uni.name }</p>) }
                    </TableRowColumn>
                  </TableRow>

                  <TableRow displayBorder={false}>
                    <TableRowColumn style={table_header_style}>FACEBOOK</TableRowColumn>
                    <TableRowColumn style={table_body_style}>
                      <Link to={ `https://facebook.com/${user.fbUserId}` }>Facebook profile</Link>
                    </TableRowColumn>
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
