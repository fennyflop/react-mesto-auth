import './Login.css';
import { useState } from 'react';

function Login({ handleLogin }) {

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
        handleLogin(email, password);
    };

    return (
        <section className="login">
            <h1 className="login__title">Вход</h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <fieldset className="login__fieldset">
                    <input type="text" className="login__input" placeholder="Email" onChange={handleEmailChange} value={email} />
                    <input type="password" className="login__input" placeholder="Пароль" onChange={handlePasswordChange} value={password} />
                </fieldset>
                <button type="submit" className="login__submit">Войти</button>
            </form>
        </section>
    );
};

export default Login;