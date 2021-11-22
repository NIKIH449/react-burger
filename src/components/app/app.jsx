import React, { useState } from 'react';
import appStyles from './app.module.css';
import Main from '../main/main';
import AppHeader from '../header/app-header';
import '../../fonts/fonts.css';
import { INGREDIENTS_URL } from '../../utils/constants';
import { useEffect } from 'react';
import { IngredientsContext } from 'context/IngredientsContext';
import { ConstructorContext } from 'context/ConstructorContext';
import { OrderContext } from 'context/OrderContext';

function App() {
  const [order, setOrder] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [constructorValue, setConstructorValue] = useState({
    bun: [
      {
        _id: '60d3b41abdacab0026a733c6',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
      },
    ],
    other: [],
  });

  useEffect(() => {
    fetch(INGREDIENTS_URL)
      .then((data) => data.json())
      .then((data) => setIngredients(data.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <OrderContext.Provider value={{ order, setOrder }}>
        <IngredientsContext.Provider value={{ ingredients }}>
          <ConstructorContext.Provider
            value={{ constructorValue, setConstructorValue }}
          >
            <Main />
          </ConstructorContext.Provider>
        </IngredientsContext.Provider>
      </OrderContext.Provider>
    </div>
  );
}

export default App;
