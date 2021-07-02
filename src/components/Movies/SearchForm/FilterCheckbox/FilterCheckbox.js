function FilterCheckbox() {
  return (
    <div className="search-form__filter">
        <input 
        className="form-input seach-form__input_type_toggle"
        type="checkbox" 
        id="short-movie"
        name="short-movie" />
        {/* <span className="search-form__slider"></span> */}
        <label className="search-form__filter-name" htmlFor="short-movie">Короткометражки</label>
      </div>
  )
};

export default FilterCheckbox;