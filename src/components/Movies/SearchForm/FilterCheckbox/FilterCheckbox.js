// import React from 'react';

function FilterCheckbox(props) {

  // const [checked, setChecked] = React.useState(false);

  // function handleCheck(evt) {
  //   // setChecked(!checked)
  //   props.onToggleCheckbox(evt.target.checked)
  // }

  return (
    <div className="search-form__filter">
      <div className="search-form__filter-elements">
        <input 
          className="form-input seach-form__input_type_toggle"
          type="checkbox" 
          id="short-movie"
          name="short-movie"
          checked={props.checked}
          // onChange={handleCheck}
          onChange={props.handleCheck}
          />
        <label className="search-form__filter-name" htmlFor="short-movie">Короткометражки</label>
      </div>
      </div>
  )
};

export default FilterCheckbox;