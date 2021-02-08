import React from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onLike, onDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    if (!card) {
        return null;
    }

    const cardDeleteButtonClass = (
        `gallery__delete-button ${card.owner === currentUser._id ? '' : 'gallery__delete-button_display_none'}`
    )

    const cardLikeButtonClassName = `gallery__like-button ${card.likes.some((i) => i._id === currentUser._id) ? 'gallery__like-button_liked' : ''}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLike() {
        onLike(card);
    }

    function handleDelete() {
        onDelete(card);
    }

    return (
        <div className="gallery__item">
            <button className={cardDeleteButtonClass} aria-label="Удалить карточку" onClick={handleDelete}></button>
            <img className="popup__open gallery__item-image" alt={card.name}
                src={card.link} onClick={handleClick} />
            <div className="gallery__item-description">
                <h2 className="gallery__item-title">{card.name}</h2>
                <div className="gallery__like-container">
                    <button className={cardLikeButtonClassName} onClick={handleLike} aria-label="Поставить лайк"></button>
                    <p className="gallery__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;