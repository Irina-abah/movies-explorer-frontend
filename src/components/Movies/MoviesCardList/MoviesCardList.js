import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <section className="movie-list">
      <ul className="movie-list__container">
        {
          props.movies.map((movie, i) => (
              <MoviesCard
              key={movie._id}
              movie={movie}
              />
          ))
        }
      </ul>
      <button className="button button_type_more" type="button" aria-label="more button">Еще</button>
    </section>
  )
};

export default MoviesCardList;