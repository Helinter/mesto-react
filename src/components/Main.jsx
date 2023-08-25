import React, { useState, useEffect, useRef } from 'react';
import addButton from '../images/add-button.svg';
import { api } from '../utils/Api';
import Card from './Card';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  
}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);
  const elementRef = useRef();

  
  
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardsData);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);




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
          <Card key={card._id} card={card} handleClick={onCardClick} />  
        ))}
      </section>
    </>
  );
}

export default Main;
