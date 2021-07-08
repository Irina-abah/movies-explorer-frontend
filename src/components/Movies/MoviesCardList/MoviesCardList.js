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
    </section>
  )
};

export default MoviesCardList;