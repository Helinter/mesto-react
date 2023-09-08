import React from 'react';

function PopupWithForm({ title, name, isOpen, onClose, children, onSubmit }) {
  const popupClassName = `popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <button type="button" className="button popup__container-close-button" onClick={onClose}></button>
        <h2 className="popup__container-title">{title}</h2>
        <form name={name} className="form" noValidate onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
