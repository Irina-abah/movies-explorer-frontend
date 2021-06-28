import Magnifier from '../../../images/search-icon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form 
        className="seach-form__input-container" 
        name="search" 
        onSubmit={props.onSubmit}>
          <img className="search-form__icon" src={Magnifier} alt="Иконка поиска" />
          <input 
          className="seach-form__input seach-form__input_type_search"
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
        </form>
        <button 
          type="submit" 
          className="button button_type_search"
          aria-label="search a movie">
        </button>
      </div>
      <FilterCheckbox />
    </section>
  )
};

export default SearchForm;