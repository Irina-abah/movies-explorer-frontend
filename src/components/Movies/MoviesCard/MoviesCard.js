function MoviesCard(props) {

  return (
    <li className="movie">
      <div className="movie__info">
        <div className="movie__description">
          <h2 className="movie__title">{props.movie.nameRU}</h2>
          <p className="movie__duration">{props.movie.duration}</p>
        </div>
        {!props.isSaved ? 
        (<button className="button button_type_save" type="button" aria-label="save button"/>) : 
        (<button className="button button_type_delete" type="button" aria-label="delete button"/>) }
      </div>
      <img className="movie__image" src={props.movie.thumbnail} alt={props.movie.nameRU}/>
      
    </li>
  )
};

export default MoviesCard;