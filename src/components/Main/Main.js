import React from 'react';
import Card from '../Card/Card';
import Login from '../Login/Login';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar-container">
                        <img className="profile__avatar" alt="Аватарка пользователя" src={currentUser.avatar} />
                        <button className="profule__button profile__button_action_edit-avatar" type="button" aria-label="Редактировать аватар профиля" onClick={props.onEditAvatar}>

                        </button>
                    </div>
                    <div className="profile__part">
                        <div className="profile__initials">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <p className="profile__job">{currentUser.about}</p>
                        </div>
                        <button className="profile__button popup__open profile__button_action_edit" id="popupEdit" type="button"
                            aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
                    </div>
                </div>
                <button className="profile__button popup__open profile__button_action_add" id="popupAdd" type="button"
                    aria-label="Кнопка" onClick={props.onAddPlace}></button>
            </section>
            <section className="gallery">
                {props.cards.map((card) => {
                    return (<Card onDelete={props.onDelete} onLike={props.onLike} onCardClick={props.onCardClick} key={card._id} card={card}></Card>)
                })}
            </section>
        </main>
    )
}

export default Main;