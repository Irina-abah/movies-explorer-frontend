import React from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';


function Movies(props) {

  const [input, setInput] = React.useState('');
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState('');
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);

  // поиск по ключевому слову

  function handleSubmit(input) {
    const movies = JSON.parse(localStorage.getItem('movies'));

    const searchedMovies = movies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(input.toLowerCase())
     }) 
     setInput(input);
     setSearchedMovies(searchedMovies);
     localStorage.setItem('filteredMovies',  JSON.stringify(searchedMovies));
  }

  // чекбокс
 function handleCheckbox() {

  const shortMovie = props.movie.duration <= 40;
 }

 // More button

  

  return (
    <main className="main movies">
      <Header loggedIn={props.loggedIn}/>
      <SearchForm 
      onSubmit={handleSubmit} 
      onChangeCheckbox={handleCheckbox} />
      <MoviesCardList 
      movies={searchedMovies}/>
      {/* <Preloader isLoading={!isLoading}/> */}
      <Footer/>
    </main>
    
  )
};

export default Movies;