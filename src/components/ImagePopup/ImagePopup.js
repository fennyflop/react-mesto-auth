import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <section className={`popup zoom ${card !== null ? 'popup__opened' : ''}`}>
            <div className="zoom__container">
                <button className="popup__close-button zoom__close-button" type="button" aria-label="Закрыть форму" onClick={onClose} ></button>
                <img className="zoom__image" alt={card !== null ? card.name : ''} src={card !== null ? card.link : ''} />
                <h2 className="zoom__title">{card !== null ? card.name : ''}</h2>
            </div>
        </section>
    );
}

export default ImagePopup;