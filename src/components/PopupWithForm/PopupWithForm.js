import React, { useState, useEffect } from 'react';

function PopupWithForm(props) {
    return (
        <section className={`popup popup__${props.name} ${props.isOpen ? 'popup__opened' : ''}`}>
            <div className="popup__container">
                <p className="popup__title">{props.title}</p>
                {props.children}
                <button onClick={props.onClose} className="popup__close-button popup__edit-close" type="button" aria-label="Закрыть форму"></button>
            </div>
        </section>
    );
}

export default PopupWithForm;