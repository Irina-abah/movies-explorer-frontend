import React from 'react';
import Magnifier from '../../../images/search-icon-grey.svg';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import {SEARCH_VALIDATE_MESSAGE} from '../../../utils/constants';

function SearchForm(props) {

  const [keyword, setKeyword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleChange(evt) {
    setKeyword(evt.target.value);
    setError(SEARCH_VALIDATE_MESSAGE);
    setIsFormValid(evt.target.closest('form').checkValidity());
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isFormValid) {
      props.onSubmit(keyword)
    } else {
      setError(SEARCH_VALIDATE_MESSAGE);
    }
  }

  function handleChangeCheckbox() {
    props.onChangeCheckbox();
  }

  return (
    <section className="search-form">
        <form 
        className="search-form__container" 
        name="search" 
        onSubmit={handleSubmit}>
          <div className="search-form__block">
            <img className="search-form__icon" src={Magnifier} alt="Иконка поиска" />
            <div className="form-wrapper">
              <input 
                className="form-input search-form__input_type_movie"
                type="text"
                id="search"
                name="movie-search"
                onChange={handleChange}
                placeholder="Фильм"
                title="Нужно ввести ключевое слово"
                minLength="2"
                maxLength="30"
                required />
              <span
              className={`input-error input-error_type_movie ${!isFormValid && "input-error_active"}`} 
              id="search-error">{error}
              </span>
            </div>
          </div>
          <button 
            type="submit" 
            className={`button button_type_search ${!isFormValid ? "button_type_search_disabled" : ""}`} 
            aria-label="search a movie">
          </button>
              
        </form>
        <FilterCheckbox 
          onToggleCheckbox={handleChangeCheckbox} 
          onChecked={props.onChecked}
          onShowSearchedMovies={props.onShowSearchedMovies}/>
    </section>
  )
};

export default SearchForm;