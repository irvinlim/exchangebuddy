import React from 'react';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import { LinkButton } from '../Link';

import Step1 from '../SignupStepper/Step1';
import Step2 from '../SignupStepper/Step2';

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

  componentDidMount() {
    if (this.props.hasJoinedGroup)
      this.setState({ stepIndex: 2 });
  }

  render() {
    return (
      <Stepper activeStep={ this.state.stepIndex } orientation="vertical">
        <Step>
          <StepLabel>Complete your profile</StepLabel>
          <StepContent>
            <Step1
              handleNext={ this.handleNext.bind(this) }
              universities={ this.props.universities } />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Select your exchange university</StepLabel>
          <StepContent>
            <Step2
              handlePrev={ this.handlePrev.bind(this) }
              handleNext={ this.handleNext.bind(this) }
              universities={ this.props.universities } />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Verify your email</StepLabel>
          <StepContent>
            <p className="small-text">Feature not yet implemented.</p>
            <LinkButton to="/group" label="Go to your group" />
          </StepContent>
        </Step>
      </Stepper>
    );
  }
}
