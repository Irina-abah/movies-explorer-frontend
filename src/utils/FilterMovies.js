import {SHORT_MOVIE_DURATION} from '../utils/constants';

function searchMovieByKeyword(movies, input) {
  const searchedMovies = movies.filter(movie => {
    return movie.nameRU.toLowerCase().includes(input.toLowerCase())
   }) 

   return searchedMovies
} 

  function searchShortMovie(movies) {
    const shortMovies = movies.filter((item) => {
        return item.duration < SHORT_MOVIE_DURATION;
    });

    return shortMovies
}

export {searchMovieByKeyword, searchShortMovie};