import React, { Component } from 'react';
import logo from '../../images/logo.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип веб=сайта" />
        </header>
    );
}

export default Header;