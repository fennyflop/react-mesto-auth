import './Registration.css';

function Registration() {
    return (
        <section className="registration">
            <h1 className="registration__title">Регистрация</h1>
            <form className="registration__form">
                <fieldset className="registration__fieldset">
                    <input type="text" className="registration__input" placeholder="Email" />
                    <input type="password" className="registration__input" placeholder="Пароль" />
                </fieldset>
                <div>
                    <button type="submit" className="registration__submit">Войти</button>
                    <p className="registration__text">
                        Уже зарегистрированы? Войти
                </p>
                </div>
            </form>
        </section>
    );
};

export default Registration;