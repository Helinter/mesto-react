import React, {  useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {

  const placeNameInputRef = useRef();
  const placeLinkInputRef = useRef();



  function handleSubmit(e) {
    const newPlaceName = placeNameInputRef.current.value;
    const newPlaceLink = placeLinkInputRef.current.value;
    e.preventDefault();
    onAddPlace({ name: newPlaceName, link: newPlaceLink,
    })
  } 
  
  

  return (
    <PopupWithForm
          title="Новое место"
          name="placeForm"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <span id="formPlace-error" className="error"></span>
          <input ref={placeNameInputRef} className="popup__input popup__input_type_place" minLength="2" maxLength="30" type="text" name="formPlace" placeholder="Название" required />
          <input ref={placeLinkInputRef} className="popup__input popup__input_type_link" type="url" name="formLink" placeholder="Ссылка на картинку" required />
          <span id="formLink-error" className="error"></span>
          <button type="submit" className="popup__container-button" id="cardSubmit" >Создать</button>
        </PopupWithForm>
  );
}