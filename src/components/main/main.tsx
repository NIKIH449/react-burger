import React from 'react';
import mainStyle from './main.module.css';
import { BurgerIngredients } from 'components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from 'components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Main() {
  return (
    <main className={mainStyle.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}

export default Main;
