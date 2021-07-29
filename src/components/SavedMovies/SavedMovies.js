import Header from '../Header/Header';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
  return (
    <section className="main movies">
      <Header loggedIn={props.loggedIn}/>
      <SearchForm />
      <MoviesCardList 
      movies={props.movies}
      onMovieDelete={props.onMovieDelete}
      savedMovies={props.savedMovies}/>
      <Footer/>
    </section> 
   
  )
};

export default SavedMovies;