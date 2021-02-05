import './Login.css';
import { useState, useEffect } from 'react';

function Login() {

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
        fetch('https://auth.nomoreparties.co/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
            })
    };

    // useEffect(() => {
    //     console.log(email, password);
    // }, [email, password]);

    return (
        <section className="login">
            <h1 className="login__title">Вход</h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <fieldset className="login__fieldset">
                    <input type="text" className="login__input" placeholder="Email" onChange={handleEmailChange} />
                    <input type="password" className="login__input" placeholder="Пароль" onChange={handlePasswordChange} />
                </fieldset>
                <button type="submit" className="login__submit">Войти</button>
            </form>
        </section>
    );
};

export default Login;