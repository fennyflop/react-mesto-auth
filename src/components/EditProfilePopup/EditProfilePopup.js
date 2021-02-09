import React, { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    // Контекст

    const currentUser = React.useContext(CurrentUserContext);

    // Имя и подробная информация 
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    // Установление информации каждый раз когда обновляется контекст currentUser

    useEffect(() => {
        if (!currentUser) {
            return;
        }
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser])

    // Операторы изменений

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    // Обработчик формы

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateUser(name, description);
    }

    return (
        <PopupWithForm handleSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} title="Редактировать профиль" name="edit">
            <input autoComplete="off" className="form__item form__item_action_edit-name" type="text" name="name"
                placeholder="Имя" required minLength="2" maxLength="40" onChange={handleNameChange} value={name} />
            <span className="form__input-error" id="name-error"></span>
            <input autoComplete="off" className="form__item form__item_action_edit-job" type="text" name="job" required
                placeholder="Род занятий" minLength="2" maxLength="200" onChange={handleDescriptionChange} value={description} />
            <span className="form__input-error" id="info-error"></span>
            <button type="submit" className="form__submit-button" id="editSubmiter" aria-label="Отправить форму">Сохранить</button>
        </PopupWithForm>
    );
}