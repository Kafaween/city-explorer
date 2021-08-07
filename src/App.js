import React, { Component } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

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
            <h1>Location information</h1>

            {this.state.error && (
              <div>
                <Alert key={1} variant={'danger'}>
                  {this.state.error}
                </Alert>
              </div>
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
            {this.state.req && (
              <div>
                {this.state.req.map((e) => {
                  return (
                    <div>
                      <p>{e.date}</p>
                      <p>{e.description}</p>
                    </div>
                  );
                })}
              </div>
            )}
            {this.state.req1 && (
              <div>
                {this.state.req1.map((e) => {
                  return (
                    <div>
                      <p>{e.title}</p>
                      <p>{e.overview}</p>
                      <p>{e.vote_average}</p>
                      <p>{e.vote_count}</p>

                      <Image
                        src={`https://image.tmdb.org/t/p/w185${e.poster_path}`}
                        alt='not available'
                      />
                      <p>{e.popularity}</p>
                      <p>{e.release_date}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Row>
      </Container>
    );
  }
}

export default App;
