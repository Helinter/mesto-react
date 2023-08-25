import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };


  // Обработчики для открытия/закрытия попапов
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };



  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setImagePopupOpen(false)
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        closeAllPopups={closeAllPopups}
        onCardClick={handleCardClick}
      />
      <Footer />

      <ImagePopup link={selectedCard?.link} name={selectedCard?.name} isOpen={isImagePopupOpen} onClose={closeAllPopups} />


      <PopupWithForm
        title="Редактировать профиль"
        name="profileForm"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <span id="formName-error" className="error"></span>
        <input className="popup__input popup__input_type_name" minLength="2" maxLength="40" type="text" name="formName" required placeholder="Имя" />
        <input className="popup__input popup__input_type_job" minLength="2" maxLength="200" type="text" name="formJob" required placeholder="Профессия" />
        <span id="formJob-error" className="error"></span>
        <button type="submit" className="popup__container-button">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        name="placeForm"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <span id="formPlace-error" className="error"></span>
        <input className="popup__input popup__input_type_place" minLength="2" maxLength="30" type="text" name="formPlace" placeholder="Название" required />
        <input className="popup__input popup__input_type_link" type="url" name="formLink" placeholder="Ссылка на картинку" required />
        <span id="formLink-error" className="error"></span>
        <button type="submit" className="popup__container-button popup__container-button_invalid" id="cardSubmit" disabled>Создать</button>
      </PopupWithForm>
      <PopupWithForm
        title="Вы уверены?"
        name="deleteForm"
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
      >
        <button type="submit" className="popup__container-button popup__container-button_type_delete" id="deleteSubmit">Да</button>
      </PopupWithForm>
      <PopupWithForm
        title="Обновить аватар"
        name="avatarForm"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <span id="formAvatar-error" className="error"></span>
        <input className="popup__input popup__input_type_avatar" type="url" name="formAvatar" placeholder="Ссылка на аватар" required />
        <button type="submit" className="popup__container-button">Сохранить</button>
      </PopupWithForm>
    </div>
  );
}

export default App;
