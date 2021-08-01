function FilterCheckbox(props) {

  function handleCheck(evt) {
    if (evt.target.checked) {
      props.onToggleCheckbox(evt.target.checked)
    } else {
      props.onShowSearchedMovies()
    }

  }

  return (
    <div className="search-form__filter">
      <div className="search-form__filter-elements">
        <input 
          className="form-input seach-form__input_type_toggle"
          type="checkbox" 
          id="short-movie"
          name="short-movie"
          checked={props.onChecked}
          onChange={handleCheck}/>
          <label className="search-form__filter-name" htmlFor="short-movie">Короткометражки</label>
      </div>
      </div>
  )
};

export default FilterCheckbox;