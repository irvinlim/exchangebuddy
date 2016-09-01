import React from 'react';
import * as ImagesHelper from '../../util/images';
import * as IconsHelper from '../../util/icons';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';

import ProfilePaper from '../components/ProfilePaper';

const Profile = ({ params }) => (
  <div className="page-profile">
    <Grid>
      <Row>
        <Col xs={12}>
          <ProfilePaper userId={ params.userId } />
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Profile;
