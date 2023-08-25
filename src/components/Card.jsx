import React from 'react';

function Card({ card, onCardClick }) {
  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <div key={card._id} className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__likes">
        <button type="button" className="element__like-button"></button>
        <p className="element__like-counter">{card.likes.length}</p>
      </div>
      <button type="button" className="element__delete-button"></button>
    </div>
  );
}

export default Card;
