import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import {MOVIE_NOT_FOUND_MESSAGE} from '../../../utils/constants';
import {SEARCH_ERROR_MESSAGE} from '../../../utils/constants';
import DisplayMovieCards from '../../../utils/MoviesToDisplay';

function MoviesCardList(props) {

  const [visibleMovies, setVisibleMovies] = React.useState(0);
  const [moviesToLoad, setMoviesToLoad] = React.useState(0);
  const { windowWidth } = DisplayMovieCards();
  const location = useLocation();


  React.useState(() => {
    if (location.pathname === '/movies') {
      if (windowWidth <= 480) {
        setVisibleMovies(5);
        setMoviesToLoad(2);
      } else if (windowWidth <= 768) {
        setVisibleMovies(8);
        setMoviesToLoad(2);
      } else if (windowWidth <= 1280) {
        setVisibleMovies(12);
        setMoviesToLoad(3);
      } else {
        setVisibleMovies(props.movies.length)
      }
    }
  }, [windowWidth, location, props.movies.length]);

  const handleShowMoreMovies = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + moviesToLoad)
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