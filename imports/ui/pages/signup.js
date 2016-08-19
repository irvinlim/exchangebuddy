import React from 'react';
import { Grid } from 'meteor/lifefilm:react-flexbox-grid';

import SignupStepper from '../components/SignupStepper';

const Signup = () => (
  <Grid>
    <div className="text-center">
      <h2>Complete your profile</h2>
      <SignupStepper />
    </div>
  </Grid>
);

export default Signup;
