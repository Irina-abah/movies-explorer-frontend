import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import {MOVIE_NOT_FOUND_MESSAGE} from '../../../utils/constants';
import {
  SEARCH_ERROR_MESSAGE,
  BREAKPOINT_MOBILE,
  BREAKPOINT_TABLET,
  BREAKPOINT_DESKTOP,
  VISIBLE_MOVIES_MOBILE,
  MOVIES_TO_LOAD_MOBILE,
  VISIBLE_MOVIES_TABLET,
  MOVIES_TO_LOAD_TABLET,
  VISIBLE_MOVIES_DESKTOP,
  MOVIES_TO_LOAD_DESKTOP } 
  from '../../../utils/constants';
import DisplayMovieCards from '../../../utils/MoviesToDisplay';

function MoviesCardList(props) {

  const [visibleMovies, setVisibleMovies] = React.useState(0);
  const [moviesToLoad, setMoviesToLoad] = React.useState(0);
  const { windowWidth } = DisplayMovieCards();
  const location = useLocation();

  React.useState(() => {
    if (location.pathname === '/movies') {
      if (windowWidth <= BREAKPOINT_MOBILE) {
        setVisibleMovies(VISIBLE_MOVIES_MOBILE);
        setMoviesToLoad(MOVIES_TO_LOAD_MOBILE);
      } else if (windowWidth <= BREAKPOINT_TABLET) {
        setVisibleMovies(VISIBLE_MOVIES_TABLET);
        setMoviesToLoad(MOVIES_TO_LOAD_TABLET);
      } else if (windowWidth < BREAKPOINT_DESKTOP && windowWidth >= BREAKPOINT_TABLET) {
        setVisibleMovies(VISIBLE_MOVIES_DESKTOP);
        setMoviesToLoad(MOVIES_TO_LOAD_DESKTOP);
      } else if (windowWidth >= BREAKPOINT_DESKTOP) {
        setVisibleMovies(VISIBLE_MOVIES_DESKTOP)
        setMoviesToLoad(MOVIES_TO_LOAD_DESKTOP);
      }
    }
  }, [windowWidth, location]);

  const handleShowMoreMovies = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + moviesToLoad)
  } 

  return (
    <section className="movie-list">
    <Route exact path="/movies">
      {props.moviesNotFound && <p className="movie-list__not-found">{MOVIE_NOT_FOUND_MESSAGE}</p>}
      {!props.isLoading && props.isFailed && <p className="movie-list__not-found">{SEARCH_ERROR_MESSAGE}</p>}
      <ul className="movie-list__container">
        {
          props.movies.slice(0, visibleMovies).map((movie, i) => (
            <MoviesCard
            key={i}
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
        onClick={handleShowMoreMovies}>??????</button>
    </Route>
    <Route path="/saved-movies">
    {props.savedMoviesNotFound && <p className="movie-list__not-found">{MOVIE_NOT_FOUND_MESSAGE}</p>}
      {!props.isLoading && props.isFailed && <p className="movie-list__not-found">{SEARCH_ERROR_MESSAGE}</p>}
      <ul className="movie-list__container">
          {
            props.movies.map((movie, i) => (
              <MoviesCard
              key={i}
              movie={movie}
              savedMovies={props.savedMovies}
              onMovieDelete={props.onMovieDelete}
              />
            ))
          }
        </ul>
    </Route>
  </section>)  
};

export default MoviesCardList;