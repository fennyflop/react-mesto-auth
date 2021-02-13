import PopupWithForm from '../PopupWithForm/PopupWithForm';

function ConfirmationPopup({ onClose }) {
    return (
        <PopupWithForm onClose={onClose} title="Вы уверены?" name="confirmation">
            <button type="submit" className="form__submit-button confirmation__button"
                aria-label="Отправить форму">Да</button>
        </PopupWithForm>
    );
};

export default ConfirmationPopup;