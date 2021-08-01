import React, { Component } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: '',
      error: false,
    };
  }

  submitForm = async (e) => {
    e.preventDefault();
    const location = e.target.locationName.value;
    try {
      const response = await axios.get(
        `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&q=${location}&format=json`
      );

      console.log('our axios response', response.data[0]);

      this.setState({
        locationData: response.data[0],
      });
    } catch {
      this.setState({
        error: true,
      });
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <form onSubmit={this.submitForm}>
            <label>Location Name:</label>
            <input
              name='locationName'
              type='text'
              placeholder='Enter the location name you want to search'
            />
            <input type='submit' value='search Location' />
          </form>
          <div className='text-center'>
            <h1>Location information</h1>

            {this.state.error && (
              <h1>
                Erorre 404<h2>Unable to geocode</h2>
              </h1>
            )}

            {this.state.locationData.display_name && (
              <p>{this.state.locationData.display_name}</p>
              // <img src='https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=9&size=300x300&format=png&maptype=roadmap&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>'></img>
            )}
            {this.state.locationData.display_name && (
              <Image
                src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=16&size=480x480&markers=icon:large-red-cutout|${this.state.locationData.lat},${this.state.locationData.lon}&markers=icon:large-red-cutout|${this.state.locationData.lat},${this.state.locationData.lon}&path=fillcolor:%23add8e6|weight:1|color:blue|${this.state.locationData.lat},${this.state.locationData.lon}|${this.state.locationData.lat},${this.state.locationData.lon}|${this.state.locationData.lat},${this.state.locationData.lon}|${this.state.locationData.lon}`}
                alt='map'
              />
            )}
          </div>
        </Row>
      </Container>
    );
  }
}

export default App;
