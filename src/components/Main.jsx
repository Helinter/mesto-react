import React, { useState, useEffect, useRef } from 'react';
import addButton from '../images/add-button.svg';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import Card from './Card';

function Main({
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  isDeletePopupOpen,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  closeAllPopups,
  onCardClick,
  setSelectedCard,
  setImagePopupOpen
}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);
  const elementRef = useRef();

  

  const handleImagePopupOpen = (card) => {
    setSelectedCard(card); 
    setImagePopupOpen(true); 
  };
  
  useEffect(() => {
    // Используем методы Api для получения данных пользователя
    api.getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .then(() => {
        api.getCards()
          .then((cardsData) => {
            setCards(cardsData);
          })
          .catch((error) => {
            console.error('Ошибка при загрузке данных карточек:', error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Доступ к DOM элементам после загрузки карточек
    if (elementRef.current) {
    }
  }, [cards]);

  
  function handleClick(card) {
    onCardClick(card);
    handleImagePopupOpen(card);
    console.log(card)
  }

  return (
    <>
      <section className="profile">
        <div className="profile__avatar-container" src={`url(${userAvatar})` }>
          <img className="profile__avatar" src={userAvatar} alt="аватар" />
          <button type="button" className="button profile__avatar-edit-icon" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__info-title">{userName}</h1>
          <button type="button" className="button profile__info-edit-button" onClick={onEditProfile}></button>
          <p className="profile__info-subtitle">{userDescription}</p>
        </div>
        <button type="button" className="button profile__add-button" onClick={onAddPlace}>
          <img className="profile__add-button-image" src={addButton} alt="плюс" />
        </button>
      </section>
      <section ref={elementRef} className="elements">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={handleClick} /> 
        ))}
      </section>
      <PopupWithForm
        title="Редактировать профиль"
        name="profileForm"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <span id="formName-error" className="error"></span>
        <input className="popup__input popup__input_type_name" minLength="2" maxLength="40" type="text" name="formName" required />
        <input className="popup__input popup__input_type_job" minLength="2" maxLength="200" type="text" name="formJob" required />
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
      <ImagePopup onClose={closeAllPopups} />
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
    </>
  );
}

export default Main;
