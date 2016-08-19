import React from 'react';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';

import Step1 from '../SignupStepper/Step1';

export default class SignupStepper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      stepIndex: 0,
    };
  }

  handleNext(callback) {
    const { stepIndex } = this.state;

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  handlePrev(callback) {
    const { stepIndex } = this.state;

    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  render() {
    return (
      <Stepper activeStep={ this.state.stepIndex } orientation="vertical">
        <Step>
          <StepLabel>Complete your profile</StepLabel>
          <StepContent>
            <Step1
              handleNext={ this.handleNext.bind(this) }
              universities={ this.props.universities }
              initialValues={ this.props.user } />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Select your exchange university</StepLabel>
          <StepContent>

          </StepContent>
        </Step>
        <Step>
          <StepLabel>Verify your email</StepLabel>
          <StepContent>

          </StepContent>
        </Step>
      </Stepper>
    );
  }
}
