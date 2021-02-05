import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';


function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип веб=сайта" />
            <Switch>
                <Route path="/sign-in">
                    <NavLink to="sign-up" className="header__button">Регистрация</NavLink>
                </Route>
                <Route path="/sign-up">
                    <NavLink to="sign-in" className="header__button">Войти</NavLink>
                </Route>
            </Switch>
        </header>
    );
}

export default Header;