import MoviePath from '../../../images/movie-image.jpg';

function MoviesCard() {
  return (
    <li className="movie">
      <div className="movie__info">
        <div className="movie__description">
          <h2 className="movie__title">33 слова о дизайне</h2>
          <p className="movie__duration">1ч 47м</p>
        </div>
        <button className="button button_type_save" type="button" aria-label="save button"/>
      </div>
      <img className="movie__image" src={MoviePath} alt="Кадр из фильма"/>
      
    </li>
  )
};

export default MoviesCard;