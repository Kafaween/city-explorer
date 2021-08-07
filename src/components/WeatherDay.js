import React, { Component } from 'react';

export class WeatherDay extends Component {
  render() {
    return (
      <div>
        {this.props.req && (
          <div>
            {this.props.req.map((e) => {
              return (
                <div>
                  <p>{e.date}</p>
                  <p>{e.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default WeatherDay;
