import React from 'react';
import { Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import {MOVIE_NOT_FOUND_MESSAGE} from '../../../utils/constants';
import {SEARCH_ERROR_MESSAGE} from '../../../utils/constants';

function MoviesCardList(props) {

  const [visibleMovies, setVisibleMovies] = React.useState(3);

  const handleShowMoreMovies = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 3)
}

  return (
    props.notFound ? <p className="movie-list__not-found">{MOVIE_NOT_FOUND_MESSAGE}</p> :
    (!props.isLoading && props.isFailed ? <p className="movie-list__not-found">{SEARCH_ERROR_MESSAGE}</p> : <section className="movie-list">
    <Route exact path="/movies">
      <ul className="movie-list__container">
        {
          props.movies.slice(0, visibleMovies).map((movie, i) => (
              <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              onSaveClick={props.onSaveClick}
              savedMovies={props.savedMovies}
              onMovieDelete={props.onMovieDelete}
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
                savedMovies={props.savedMovies}
                onMovieDelete={props.onMovieDelete}
                />
            ))
          }
        </ul>
    </Route>
  </section>)  
    
  )
};

export default MoviesCardList;