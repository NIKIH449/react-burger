import React from 'react';
import mainStyle from './main.module.css';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';

function Main(props) {
  const [bag, setBag] = React.useState({});

  function addIngredients(item) {
    setBag(item);
  }

  return (
    <main className={mainStyle.main}>
      <BurgerIngredients
        data={props.data}
        onItemClick={addIngredients}
      ></BurgerIngredients>
      <BurgerConstructor bag={bag}></BurgerConstructor>
    </main>
  );
}

export default Main;
