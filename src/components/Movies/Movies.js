import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
// import Preloader from '../Preloader/Preloader';
import movies from '../../utils/constants';

function Movies() {
  return (
    <main className="main movies">
      <SearchForm />
      <MoviesCardList movies={movies}/>
      <button className="button button_type_more" type="button" aria-label="more button">Еще</button>
      {/* <Preloader /> */}
    </main>
    
  )
};

export default Movies;