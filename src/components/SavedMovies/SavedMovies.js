import React from 'react';
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
        checked={props.checked}
        />
        { props.isLoading ? <Preloader/> :
      <MoviesCardList 
        movies={props.movies}
        onMovieDelete={props.onMovieDelete}
        savedMovies={props.savedMovies}
        savedMoviesNotFound={props.onSavedNotFound}
        isLoading={props.isLoading}
        isFailed={props.isFailed}/> }
      <Footer/>
    </section> 
   
  )
};

export default SavedMovies;