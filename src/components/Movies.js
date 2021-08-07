import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';

export class Movies extends Component {
  render() {
    return (
      <div>
        {this.props.req && (
          <div>
            {this.props.req.map((e) => {
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
    );
  }
}

export default Movies;
