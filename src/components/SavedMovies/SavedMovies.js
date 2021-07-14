import Header from '../Header/Header';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import movies from '../../utils/constants';

function SavedMovies() {
  return (
    <section className="main movies">
      <Header/>
      <SearchForm />
      <MoviesCardList movies={movies}/>
      <Footer/>
    </section> 
   
  )
};

export default SavedMovies;