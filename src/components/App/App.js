import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import InfoToolTip from '../InfoTooltip/InfoTooltip';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import api from '../../utils/api';
import Register from '../Registration/Registration';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login';


function App() {

  // Статуcы попапов  и функции попапов

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  function onEditProfile() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function onAddPlace() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }


  function onEditAvatar() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard(null);
  }

  // Текующий пользователь и все карточки

  const [currentUser, setCurrentUser] = useState();
  const [cards, setCards] = useState();

  useEffect(() => {
    // Получаем инициалы пользователя при заходе
    api.getInitialsInfo()
      .then((res) => {
        setCurrentUser(res);
      }).catch((res) => {
        console.log(res);
      })
    // Получаем первоначальные карточки
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((res) => {
        console.log(res);
      })
  }, []);

  // Функции, которые редактируют/добавляют информацию

  function handleUpdateUser(name, about) {
    api.postProfile(name, about)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name: name,
          about: about,
        });
        closeAllPopups();
      })
      .catch((res) => {
        console.log(res);
      })
  }

  function handleUpdateAvatar(link) {
    api.postAvatar(link)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          avatar: link
        });
        closeAllPopups();
      })
      .catch((res) => {
        console.log(res);
      })
  }

  function handleAddCard(title, link) {
    api.postCard(title, link)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(res);
      })
  }

  // Операторы с карточками

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.handleLike(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((res) => {
        console.log(res);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Switch>
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route path="/sign-in">
            <Login />
          </Route>
          <Route exact path="/">
            {isLogged ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>
          <ProtectedRoute onDelete={handleCardDelete} onLike={handleCardLike} cards={cards} onCardClick={setSelectedCard} onEditProfile={onEditProfile} onAddPlace={onAddPlace} onEditAvatar={onEditAvatar} loggedIn={isLogged} component={Main} path="/" />
        </Switch>
        <Footer> </Footer>
        {/* <EditProfilePopup onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} title="Редактировать профиль" name="edit">
        </EditProfilePopup>
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen}>
        </EditAvatarPopup>
        <AddPlacePopup onAddCard={handleAddCard} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}></AddPlacePopup>
        <PopupWithForm onClose={closeAllPopups} title="Вы уверены?" name="confirmation">
          <form className="form confirmation__form">
            <button type="submit" className="form__submit-button confirmation__button" id="card-submit"
              aria-label="Отправить форму">Да</button>
          </form>
        </PopupWithForm>
        <ImagePopup onClose={closeAllPopups} card={selectedCard}> </ImagePopup>
        <InfoToolTip isOpen={false} onClose={closeAllPopups} /> */}
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
