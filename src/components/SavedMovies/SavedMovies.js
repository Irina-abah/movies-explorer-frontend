import Header from '../Header/Header';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {
  return (
    <section className="main movies">
      <Header loggedIn={props.loggedIn}/>
      <SearchForm 
        onSubmit={props.onHandleSubmit} 
        onChangeCheckbox={props.onChangeCheckbox}
        onChecked={props.onChecked}
        onShowSearchedMovies={props.onShowSearchedMovies}/>
        { props.isLoading ? <Preloader/> :
      <MoviesCardList 
        movies={props.movies}
        onMovieDelete={props.onMovieDelete}
        savedMovies={props.savedMovies}
        notFound={props.onNotFound}
        isLoading={props.isLoading}
        isFailed={props.isFailed}/> }
      <Footer/>
    </section> 
   
  )
};

export default SavedMovies;