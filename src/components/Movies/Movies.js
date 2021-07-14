import React from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
// import Preloader from '../Preloader/Preloader';
// import movies from '../../utils/constants';

function Movies(props) {

  const [input, setInput] = React.useState('');
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // поиск по ключевому слову

  function handleSubmit(input) {
    const movies = JSON.parse(localStorage.getItem('movies'));

    const filteredMovies = movies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(input.toLowerCase())
     })
     setInput(input);
     setSearchedMovies(filteredMovies);
  }
  return (
    <main className="main movies">
      <Header loggedIn={props.loggedIn}/>
      <SearchForm onSubmit={handleSubmit}/>
      <MoviesCardList movies={searchedMovies}/>
      <button className="button button_type_more" type="button" aria-label="more button">Еще</button>
      {/* <Preloader isLoading={props.isLoading}/> */}
      <Footer/>
    </main>
    
  )
};

export default Movies;