import React from 'react';
import mainStyle from './main.module.css';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';
import { mainProTypes } from '../../utils/type';

function Main(props) {
  return (
    <main className={mainStyle.main}>
      <BurgerIngredients data={props.data}></BurgerIngredients>
      <BurgerConstructor />
    </main>
  );
}

Main.propTypes = mainProTypes;
export default Main;
