import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
// import movies from '../../utils/constants';

function Movies(props) {
  return (
    <main className="main movies">
      <Header loggedIn={props.loggedIn}/>
      <SearchForm />
      <MoviesCardList movies={props.movies}/>
      <button className="button button_type_more" type="button" aria-label="more button">Еще</button>
      <Preloader isLoading={props.isLoading}/>
      <Footer/>
    </main>
    
  )
};

export default Movies;