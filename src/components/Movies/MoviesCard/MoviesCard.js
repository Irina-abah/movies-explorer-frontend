import React from 'react';
import { Route } from 'react-router';

function MoviesCard(props) {

  const [isSaved, setIsSaved] = React.useState(false);

  function handleSaveClick() {
    setIsSaved(!isSaved);
  }

  const movieCardClassName = `button button_type_save ${isSaved ? 'button_type_save-active' : ''}`; 

  return (
    <li className="movie">
      <Route path="/movies">
        <div className="movie__info">
          <div className="movie__description">
            <h2 className="movie__title">{props.movie.nameRU}</h2>
            <p className="movie__duration">{props.movie.duration}</p>
          </div>
          <button className={movieCardClassName} type="button" aria-label="delete button" onClick={handleSaveClick}/>
        </div>
        <img className="movie__image" src={'https://api.nomoreparties.co' + props.movie.image.formats.thumbnail.url} alt={props.movie.nameRU}/>
      </Route>
      <Route path="/saved-movies">
        <div className="movie__info">
          <div className="movie__description">
            <h2 className="movie__title">{props.movie.nameRU}</h2>
            <p className="movie__duration">{props.movie.duration}</p>
          </div>
          <button className="button button_type_delete" type="button" aria-label="delete button"/>
        </div>
        <img className="movie__image" src={props.movie.image} alt={props.movie.nameRU}/>
      </Route>
    </li>
  )
};

export default MoviesCard;