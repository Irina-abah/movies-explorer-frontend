import Magnifier from '../../../images/search-icon-grey.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  return (
    <section className="search-form">
        <form 
        className="search-form__container" 
        name="search" 
        onSubmit={props.onSubmit}>
          <div className="search-form__info">
            <img className="search-form__icon" src={Magnifier} alt="Иконка поиска" />
            <input 
            className="search-form__input_type_movie"
            type="text"
            id="search"
            name="movie-search"
            placeholder="Фильм"
            title="Нужно ввести ключевое слово"
            minLength="2"
            maxLength="30"
            required />
            <span 
              className="input-error" 
              id="search-error">
            </span>
          </div>
          <div className="search-form__info">
            <button 
              type="submit" 
              className="button button_type_search"
              aria-label="search a movie">
            </button>
            <FilterCheckbox />
          </div>
        </form>
    </section>
  )
};

export default SearchForm;