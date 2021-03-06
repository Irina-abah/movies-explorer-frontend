import React from 'react';
import { Route } from 'react-router';
import {BASE_URL, MINUTES_SECONDS} from '../../../utils/constants';

function MoviesCard(props) {

  const isSaved = props.savedMovies.some(item => item.movieId === props.movie.id)

  const movieCardClassName = `button button_type_save ${isSaved ? 'button_type_save-active' : ''}`;

  function handleSaveClick() {
      props.onSaveClick(props.movie);
  }

  function handleOpenTrailerClick() {
    window.open(props.movie.trailerLink || props.movie.trailer);
  }

  function handleDeleteClick() {
    props.onMovieDelete(props.movie);
  }

  const duration = `${Math.floor(props.movie.duration / MINUTES_SECONDS)}ч ${props.movie.duration % MINUTES_SECONDS}м`;
  const movieImage = props.movie.image.url ? BASE_URL + props.movie.image.url : props.movie.image;

  return (
    <li className="movie">
      <Route path="/movies">
        <div className="movie__info">
          <div className="movie__description">
            <h2 className="movie__title">{props.movie.nameRU}</h2>
            <p className="movie__duration">{duration}</p>
          </div>
          <button className={movieCardClassName} type="button" aria-label="delete button" onClick={handleSaveClick}/>
        </div>
        <img className="movie__image" src={movieImage} alt={props.movie.nameRU} onClick={handleOpenTrailerClick}/>
      </Route>
      <Route path="/saved-movies">
        <div className="movie__info">
          <div className="movie__description">
            <h2 className="movie__title">{props.movie.nameRU}</h2>
            <p className="movie__duration">{duration}</p>
          </div>
          <button className="button button_type_delete" type="button" aria-label="delete button" onClick={handleDeleteClick}/>
        </div>
        <img className="movie__image" src={movieImage} alt={props.movie.nameRU} onClick={handleOpenTrailerClick}/>
      </Route>
    </li>
  )
};

export default MoviesCard;