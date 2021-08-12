const MOVIE_NOT_FOUND_MESSAGE = 'Ничего не найдено';
const SEARCH_ERROR_MESSAGE = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
const SEARCH_VALIDATE_MESSAGE = 'Введите ключевое слово';

const BASE_URL = 'https://api.nomoreparties.co';
const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
// const BACKEND_URL = 'https://api.movie-portal.nomoredomains.monster';

const SUCCESS_MESSAGE = 'Успешно!';
const FAILED_MESSAGE = 'Что-то пошло не так! Попробуйте еще раз.';

const SHORT_MOVIE_DURATION = 40;
const MINUTES_SECONDS = 60;

const BREAKPOINT_MOBILE = 480;
const BREAKPOINT_TABLET = 768;
const BREAKPOINT_DESKTOP = 1280;


const VISIBLE_MOVIES_MOBILE = 5;
const MOVIES_TO_LOAD_MOBILE = 2;
const VISIBLE_MOVIES_TABLET = 8;
const MOVIES_TO_LOAD_TABLET = 2;
const VISIBLE_MOVIES_DESKTOP = 12;
const MOVIES_TO_LOAD_DESKTOP = 3;

export { 
  MOVIE_NOT_FOUND_MESSAGE, 
  SEARCH_ERROR_MESSAGE,
  BASE_URL,
  SEARCH_VALIDATE_MESSAGE,
  SUCCESS_MESSAGE,
  FAILED_MESSAGE,
  SHORT_MOVIE_DURATION,
  MOVIES_URL,
  MINUTES_SECONDS,
  BREAKPOINT_MOBILE,
  BREAKPOINT_TABLET,
  BREAKPOINT_DESKTOP,
  VISIBLE_MOVIES_MOBILE,
  MOVIES_TO_LOAD_MOBILE,
  VISIBLE_MOVIES_TABLET,
  MOVIES_TO_LOAD_TABLET,
  VISIBLE_MOVIES_DESKTOP,
  MOVIES_TO_LOAD_DESKTOP
  // BACKEND_URL
};