import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm onClose={props.onClose} isOpen={props.isOpen} title="Обновить аватар" name="edit_action_avatar">
            <form className="form form__edit-avatar" onSubmit={handleSubmit} noValidate>
                <input autoComplete="off" className="form__item form__item_action_edit-avatar" type="url" name="avatar"
                    placeholder="Сслыка на аватар" required minLength="2" id="name" ref={avatarRef} />
                <span className="form__input-error" id="name-error"></span>
                <button type="submit" className="form__submit-button" aria-label="Отправить форму">Сохранить</button>
            </form>
        </PopupWithForm>
    );
}