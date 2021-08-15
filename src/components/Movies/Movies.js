import React from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function Movies(props) {  

  return (
    <main className="main movies">
      <Header loggedIn={props.loggedIn}/>
      <SearchForm 
        onSubmit={props.onHandleSubmit} 
        onChangeCheckbox={props.onChangeCheckbox} 
        checked={props.checked}
        />
        { props.isLoading ? <Preloader/> :
      <MoviesCardList 
        movies={props.movies}
        onSaveClick={props.onSaveClick}
        onMovieDelete={props.onMovieDelete}
        savedMovies={props.savedMovies}
        moviesNotFound={props.onMoviesNotFound}
        isLoading={props.isLoading}
        isFailed={props.isFailed}
        savedMovie={props.savedMovie}/> }
      <Footer/> 
    </main>
    
  )
};

export default Movies;