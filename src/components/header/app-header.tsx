import React, { useEffect } from 'react';
import { HeaderButton } from './header-button/header-button';
import headerStyles from './header.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  const russian = localStorage.getItem('rus');

  function switchToEnglish() {
    if (localStorage.getItem('rus')) {
      localStorage.removeItem('rus');
      localStorage.setItem('eng', 'eng');
      window.location.reload();
    }
  }
  function switchToRussian() {
    if (localStorage.getItem('eng')) {
      localStorage.removeItem('eng');
      localStorage.setItem('rus', 'rus');
      window.location.reload();
    }
  }
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.navigation}>
        <HeaderButton link="/" name={russian ? 'Конструктор' : 'Constructor'}>
          <BurgerIcon type="primary" />
        </HeaderButton>

        <HeaderButton link="/feed"  name={russian ? 'Лента заказов' : 'Order feed'}>

          <ListIcon type="primary" />
        </HeaderButton>
        <a
          className={headerStyles.logo}
          href="https://nikih449.github.io/react-burger/"
        >
          <Logo />
        </a>
        <HeaderButton
          link="/profile"
          name={russian ? 'Личный кабинет' : 'My account'}
        >
          <ProfileIcon type="primary" />
        </HeaderButton>
      </nav>
      <button
      style={russian ? { opacity: 1 } : { opacity: 0.6 }}
        onClick={switchToRussian}
        className={`text_type_main-default ${headerStyles.languageButton}`}
      >
        RU
      </button>
      <button
        style={russian ? { opacity: 0.6 } : { opacity: 1 }}
        onClick={switchToEnglish}
        className={`text_type_main-default ${headerStyles.languageButton}`}
      >
        EN
      </button>
    </header>
  );
};

export { AppHeader };
