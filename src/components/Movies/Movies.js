import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';


function Movies() {
  return (
    <section className="movies">
      <Header />
      <SearchForm />
      <MoviesCardList />
      <button className="movies__more-button">Ещё</button>
      
    </section>
    
  )
};

export default Movies;