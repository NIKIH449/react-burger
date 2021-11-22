import React from 'react';
import mainStyle from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { mainProTypes } from 'utils/type';

function Main() {
  return (
    <main className={mainStyle.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

Main.propTypes = mainProTypes;
export default Main;
