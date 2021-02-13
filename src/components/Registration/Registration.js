import './Registration.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Registration({ handleRegister }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    };

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        handleRegister(email, password);
    }

    return (
        <section className="registration">
            <h1 className="registration__title">Регистрация</h1>
            <form className="registration__form" onSubmit={handleSubmit}>
                <fieldset className="registration__fieldset">
                    <input type="text" className="registration__input" placeholder="Email" onChange={handleEmailChange} value={email} />
                    <input type="password" className="registration__input" placeholder="Пароль" onChange={handlePasswordChange} value={password} />
                </fieldset>
                <button type="submit" className="registration__submit">Войти</button>
            </form>
            <p className="registration__text">
                Уже зарегистрированы? <NavLink to="sign-in" className="registration__text registration__redirect">Войти</NavLink>
            </p>
        </section>
    );
};

export default Registration;