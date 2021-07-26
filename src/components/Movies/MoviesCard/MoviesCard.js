import React from 'react';
import { Route } from 'react-router';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function MoviesCard(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isSaved = props.movie.owner === currentUser._id;
  const movieCardClassName = `button button_type_save ${isSaved ? 'button_type_save-active' : ''}`;

  function handleSaveClick() {
    props.onSaveClick(props.movie);
  }

  function handleOpenTrailerClick() {
    window.open(props.movie.trailerLink);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.movie);
  }

  const duration = `${Math.floor(props.movie.duration / 60)}ч ${props.movie.duration % 60}м`;
  
  

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
        <img className="movie__image" src={'https://api.nomoreparties.co' + props.movie.image.formats.thumbnail.url} alt={props.movie.nameRU} onClick={handleOpenTrailerClick}/>
      </Route>
      <Route path="/saved-movies">
        <div className="movie__info">
          <div className="movie__description">
            <h2 className="movie__title">{props.movie.nameRU}</h2>
            <p className="movie__duration">{duration}</p>
          </div>
          <button className="button button_type_delete" type="button" aria-label="delete button" onClick={handleDeleteClick}/>
        </div>
        <img className="movie__image" src={'https://api.nomoreparties.co' + props.movie.image.formats.thumbnail.url} alt={props.movie.nameRU} onClick={handleOpenTrailerClick}/>
      </Route>
    </li>
  )
};

export default MoviesCard;