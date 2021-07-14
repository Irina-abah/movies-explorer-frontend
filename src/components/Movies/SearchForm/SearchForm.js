import React from 'react';
import Magnifier from '../../../images/search-icon-grey.svg';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm(props) {

  const [keyword, setKeyword] = React.useState('');

  function handleChange(e) {
    setKeyword(e.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSubmit(keyword)
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
            {/* <span
            className="input-error" 
            id="search-error">Нужно ввести ключевое слово
            </span> */}
          </div>
          <button 
          type="submit" 
          className="button button_type_search"
          aria-label="search a movie">
        </button>
              
        </form>
        <FilterCheckbox handleCheckbox={handleChangeCheckbox}/>
    </section>
  )
};

export default SearchForm;