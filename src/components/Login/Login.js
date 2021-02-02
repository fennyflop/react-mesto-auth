import './Login.css';

function Login() {
    return (
        <section className="login">
            <h1 className="login__title">Вход</h1>
            <form className="login__form">
                <fieldset className="login__fieldset">
                    <input type="text" className="login__input" placeholder="Email" />
                    <input type="password" className="login__input" placeholder="Пароль" />
                </fieldset>
                <button type="submit" className="login__submit">Войти</button>
            </form>
        </section>
    );
};

export default Login;