import React from 'react';
import HeaderButton from './header-button/header-button';
import headerStyles from './header.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

function Header() {
  return (
    <header className={`${headerStyles.header}`}>
      <nav className={headerStyles.navigation}>
        <HeaderButton name={'Конструктор'}>
          <BurgerIcon type="primary" />
        </HeaderButton>
        <HeaderButton name={'Лента заказов'}>
          <ListIcon type="primary" />
        </HeaderButton>
        <a className={'pl-30'} href="#">
          <Logo />
        </a>
        <HeaderButton name={'Личный кабинет'}>
          <ProfileIcon type="primary" />
        </HeaderButton>
      </nav>
    </header>
  );
}

export default Header;
