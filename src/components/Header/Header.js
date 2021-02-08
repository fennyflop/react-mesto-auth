import React, { Component, useEffect, useState } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';


function Header({ email, handleLogout }) {
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
                <Route path="/">
                    <div className="header__initials">
                        <p className="header__email">{email}</p>
                        <p onClick={handleLogout} className="header__text">Выйти</p>
                    </div>
                </Route>
            </Switch>
        </header>
    );
}

export default Header;