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
        onChecked={props.onChecked}
        onShowSearchedMovies={props.onShowSearchedMovies}/>
        { props.isLoading ? <Preloader/> :
      <MoviesCardList 
        movies={props.movies}
        onSaveClick={props.onSaveClick}
        onMovieDelete={props.onMovieDelete}
        savedMovies={props.savedMovies}
        notFound={props.onNotFound}
        isLoading={props.isLoading}
        isFailed={props.isFailed}/> }
      <Footer/> 
    </main>
    
  )
};

export default Movies;