import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import movies from '../../utils/constants';

function SavedMovies() {
  return (
    <section className="main movies">
      <SearchForm />
      <MoviesCardList movies={movies}/>
    </section> 
   
  )
};

export default SavedMovies;