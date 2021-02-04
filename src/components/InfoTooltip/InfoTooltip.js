import SuccessImage from '../../images/Success.png';
import ErrorImage from '../../images/Cross.png';
import './InfoTooltip.css';

function InfoToolTip(props) {
    return (
        <>
            <section className={`info ${props.isOpen ? 'info__opened' : ''}`}>
                <div className="info__container">
                    <img className="info__image" alt="icon" src={props.success ? SuccessImage : ErrorImage} />
                    <p className="info__text">{props.success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                    <button onClick={props.onClose} className="popup__close-button popup__edit-close" type="button" aria-label="Закрыть форму"></button>
                </div>
            </section>
        </>
    );
};

export default InfoToolTip;