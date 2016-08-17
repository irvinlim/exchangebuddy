import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: null,
    }
  }

  componentDidMount() {
    // TODO: Query 3hr/ daily forecast api
    this.setState({ forecast: {
      "weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
      "main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
    }})
  }

  render() {
   return (
    <Card>
      {this.state.forecast &&
      <CardHeader
        title="Weather"
        subtitle={this.state.forecast.weather[0].main}
        actAsExpander={true}
        showExpandableButton={false} />
      }
      <CardText expandable={true}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
    </Card>
    );
  }
}
