import React from 'react';
import { Route } from 'react-router';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  const [visibleMovies, setVisibleMovies] = React.useState(3);

  const handleShowMoreMovies = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 3)
}

  return (
    <section className="movie-list">
      <Route path="/movies">
        <ul className="movie-list__container">
          {
            props.movies.slice(0, visibleMovies).map((movie, i) => (
                <MoviesCard
                key={movie.id}
                movie={movie}
                onSaveClick={props.onSaveClick}
                />
            ))
          }
        </ul>
        <button 
        className={`button button_type_more ${visibleMovies >= props.movies.length && 'button_type_more_disabled'}`}
        type="button" 
        aria-label="more button"
        onClick={handleShowMoreMovies}>Еще</button>
      </Route>
      <Route path="/saved-movies">
        <ul className="movie-list__container">
            {
              props.movies.map((movie, i) => (
                  <MoviesCard
                  key={movie._id}
                  movie={movie}
                  onCardDelete={props.onCardDelete}
                  />
              ))
            }
          </ul>
      </Route>
      
    </section>
  )
};

export default MoviesCardList;