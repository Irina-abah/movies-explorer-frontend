function FilterCheckbox() {
  return (
    <div className="search-form__filter">
      <div className="search-form__filter-elements">
        <input 
          className="form-input seach-form__input_type_toggle"
          type="checkbox" 
          id="short-movie"
          name="short-movie" />
          <label className="search-form__filter-name" htmlFor="short-movie">Короткометражки</label>
      </div>
      </div>
  )
};

export default FilterCheckbox;