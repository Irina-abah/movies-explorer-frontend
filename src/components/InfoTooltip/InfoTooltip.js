import React from 'react';
import successLogo from '../../images/success-icon.svg';
import errorLogo from '../../images/error-icon.svg';

function InfoTooltip(props) {

  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      props.onClose()
    }
  }

    return (
      <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} onMouseDown={handleOverlayClose}>
      <div className="popup__container">
          <button type="button" className="button button_type_close-popup" onClick={props.onClose} aria-label="close"> 
          </button>
          <div className="popup__info">
            <img className="popup__info-status" src={props.isSuccess ? successLogo : errorLogo} alt="Статус события" />
            <h2 className="popup__title">{props.isSuccess ? 'Успешно!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
          </div>
      </div>
  </div> 
    )
};

export default InfoTooltip;