import React from 'react';
import HeaderButton from './header-button/header-button';
import headerStyles from './header.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.navigation}>
        <HeaderButton link="/" name="Конструктор">
          <BurgerIcon type="primary" />
        </HeaderButton>
        <HeaderButton link="/none" name={'Лента заказов'}>
          <ListIcon type="primary" />
        </HeaderButton>
        <a
          className={headerStyles.logo}
          href="https://nikih449.github.io/react-burger/"
        >
          <Logo />
        </a>
        <HeaderButton link="/profile" name={'Личный кабинет'}>
          <ProfileIcon type="primary" />
        </HeaderButton>
      </nav>
    </header>
  );
}

export default AppHeader;
