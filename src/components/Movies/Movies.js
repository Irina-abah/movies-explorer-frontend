import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import movies from '../../utils/constants';

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList movies={movies}/>
      <Preloader />
    </section>
    
  )
};

export default Movies;