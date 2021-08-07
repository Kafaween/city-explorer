import React, { Component } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import WeatherDay from './components/WeatherDay';
import Movies from './components/Movies';
import Init from './components/Init';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'bootstrap';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: '',
      error: false,
      req: '',
      req1: '',
    };
  }

  submitForm = async (e) => {
    e.preventDefault();
    const location = e.target.locationName.value;
    try {
      const response = await axios.get(
        `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&q=${location}&format=json`
      );
      const request = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&loc=${response.data[0].display_name}`
      );
      const request1 = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/movies?loc=${location}`
      );
      console.log(request.data);

      console.log('our axios response', response.data[0]);
      console.log(response.data[0].display_name[0]);
      this.setState({
        locationData: response.data[0],
        req: request.data,
        req1: request1.data,
      });
    } catch (Error) {
      console.log(Error);
      this.setState({
        error: false,
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
            <input type='submit' value='explore!' />
          </form>
          <div className='text-center'>
            <Init data={this.state.locationData} error={this.state.error} />
            <WeatherDay req={this.state.req} />
            <Movies req={this.state.req1} />
          </div>
        </Row>
      </Container>
    );
  }
}

export default App;
