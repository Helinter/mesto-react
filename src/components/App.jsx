import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  

  // Обработчики для открытия/закрытия попапов
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
    console.log('клик профиль')
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
    console.log('клик новое место')
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
    console.log('клик аватар')
  };



  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePopupOpen(false);
  };

  return (
    <div className="page">
      <Header />
      <Main
      isEditProfilePopupOpen={isEditProfilePopupOpen}
      isAddPlacePopupOpen={isAddPlacePopupOpen}
      isEditAvatarPopupOpen={isEditAvatarPopupOpen}
      isDeletePopupOpen={isDeletePopupOpen}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        closeAllPopups={closeAllPopups}
        userName={userName}
        userDescription={userDescription}
        userAvatar={userAvatar}
        selectedCard={selectedCard} 
  onCardClick={handleCardClick}
  setSelectedCard={setSelectedCard}
  setImagePopupOpen={setImagePopupOpen}
      />
      <Footer />
      {selectedCard && (
  <ImagePopup link={selectedCard.link} name={selectedCard.name} isOpen={isImagePopupOpen} onClose={() => setSelectedCard(null)} />
)}

    </div>
  );
}

export default App;
