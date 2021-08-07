import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import { Alert } from 'bootstrap';

export class Init extends Component {
  render() {
    return (
      <div>
        <h1>Location information</h1>

        {this.props.error && (
          <div>
            <Alert key={1} variant={'danger'}>
              {this.props.error}
            </Alert>
          </div>
        )}

        {this.props.data.display_name && (
          <div>
            <p>{this.props.data.display_name}</p>
            <Image
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&center=${this.props.data.lat},${this.props.data.lon}&zoom=16&size=480x480&markers=icon:large-red-cutout|${this.props.data.lat},${this.props.data.lon}&markers=icon:large-red-cutout|${this.props.data.lat},${this.props.data.lon}&path=fillcolor:%23add8e6|weight:1|color:blue|${this.props.data.lat},${this.props.data.lon}|${this.props.data.lat},${this.props.data.lon}|${this.props.data.lat},${this.props.data.lon}|${this.props.data.lon}`}
              alt='map'
            />
          </div>
        )}
      </div>
    );
  }
}

export default Init;
