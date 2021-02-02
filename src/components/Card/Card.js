import React from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onLike, onDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    if (!card) {
        return null;
    }

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((i) => i._id === currentUser._id);


    const cardDeleteButtonClass = (
        `gallery__delete-button ${isOwn ? '' : 'gallery__delete-button_display_none'}`
    )

    const cardLikeButtonClassName = `gallery__like-button ${isLiked ? 'gallery__like-button_liked' : ''}`;

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