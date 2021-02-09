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
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login';


function App() {

  const history = useHistory();

  // Статуcы попапов  и функции попапов

  const [selectedCard, setSelectedCard] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState('');
  const [successState, setSuccessState] = useState(false);

  // Всплывающие окна

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  function onEditProfile() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  function onAddPlace() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };


  function onEditAvatar() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard(null);
  };

  // Пользователь не должен повторно входить

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) { // Если есть jwt, это обозначает что можно найти данные.
      getCurrentUser(jwt);
      history.push('/');
      // getCurrentCards();
    }
  }, []);

  // Функции, которые редактируют/добавляют информацию

  const [currentUser, setCurrentUser] = useState();

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

  // Операторы с карточками

  const [cards, setCards] = useState([]);

  function handleAddCard(title, link) {
    api.postCard(title, link)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(res);
      })
  };

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
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  // Вход

  function getCurrentUser(jwt) {
    api.getInitialsInfo(jwt)
      .then(({ data: user }) => {
        setCurrentUser(user);
        console.log(currentUser);
        setEmail(user.email);
      })
      .catch((err) => {
        console.log(`Произошла ошибка : ${err}`);
      });
  };

  function getCurrentCards(jwt) {
    api.getInitialCards(jwt)
      .then(({ data: cardItems }) => {
        setCards(cardItems);
      })
      .catch((err) => {
        console.log(`Произошла ошибка : ${err}`);
      })
  }

  function handleLogin(email, password) {
    api.handleLogin(email, password)
      .then(({ token }) => {
        if (token) {
          localStorage.setItem('jwt', token);
          getCurrentUser(token);
          getCurrentCards(token);
          setIsLogged(true);
          history.push('/');
        } else {
          setSuccessState(false);
          setIsInfoPopupOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };

  // Регистрация

  function handleRegister(email, password) {
    api.handleRegister(email, password)
      .then((res) => {
        if (res.data) {
          setSuccessState(true);
          setIsInfoPopupOpen(true);
          history.push('sign-in');
        } else {
          setSuccessState(false);
          setIsInfoPopupOpen(true);
        }
      })
      .catch((err) => {
        if (err.includes('400')) {
          console.log('Некорректно заполнено одно из полей ')
        }
        setSuccessState(false);
        setIsInfoPopupOpen(true);
      })
  }

  // Выход

  function handleLogout() {
    localStorage.removeItem('jwt');
    setIsLogged(false);
    history.push('sign-in');
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} handleLogout={handleLogout} />
        <Switch>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
          <ProtectedRoute
            path="/"
            onDelete={handleCardDelete}
            onLike={handleCardLike}
            cards={cards}
            onCardClick={setSelectedCard}
            onEditProfile={onEditProfile} onAddPlace=
            {onAddPlace} onEditAvatar={onEditAvatar}
            loggedIn={isLogged}
            component={Main} />
          <Route exact path="">
            {isLogged ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer> </Footer>
        <EditProfilePopup onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} title="Редактировать профиль" name="edit">
        </EditProfilePopup>
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen}>
        </EditAvatarPopup>
        <AddPlacePopup onAddCard={handleAddCard} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}></AddPlacePopup>
        <PopupWithForm onClose={closeAllPopups} title="Вы уверены?" name="confirmation">
          <button type="submit" className="form__submit-button confirmation__button"
            aria-label="Отправить форму">Да</button>
        </PopupWithForm>
        <ImagePopup onClose={closeAllPopups} card={selectedCard}> </ImagePopup>
        <InfoToolTip success={successState} isOpen={isInfoPopupOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
