import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function AddPlacePopup(props) {

    const [title, setTitle] = useState();
    const [link, setLink] = useState();

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // props.onAddCard(title, link);
        props.onAddCard(title, link);
    }

    return (
        <PopupWithForm onClose={props.onClose} isOpen={props.isOpen} title="Добавить карточку" name="card">
            <form className="form form__card" onSubmit={handleSubmit} noValidate>
                <input autoComplete="off" className="form__item form__item_action_edit-title" type="text" name="title"
                    placeholder="Название" required minLength="2" maxLength="30" id="card-title" onChange={handleTitleChange} />
                <span className="form__input-error" id="card-title-error"></span>
                <input autoComplete="off" className="form__item form__item_action_edit-link" type="url" name="link"
                    required placeholder="Ссылка на картинку" id="card" onChange={handleLinkChange} />
                <span className="form__input-error" id="card-error"></span>
                <button type="submit" className="form__submit-button" id="card-submit"
                    aria-label="Отправить форму">Сохранить</button>
            </form>
        </PopupWithForm>
    );
}