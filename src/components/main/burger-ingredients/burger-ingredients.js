import React from 'react';
import IngredientsList from './ingredients-list/ingredients-list';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import {
  Tab,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(props) {
  const [current, setCurrent] = React.useState('one');
  const [counter, setCounter] = React.useState(0);

  function countIngredients() {
    setCounter(counter + 1);
  }

  return (
    <section className={`mr-5 ${burgerIngredientsStyle.ingredinets}`}>
      <h1
        className={`text text_type_main-large pb-5 ${burgerIngredientsStyle.title}`}
      >
        Соберите бургер
      </h1>
      <div style={{ display: 'flex' }}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === 'Начинки'}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>

      <div className={`${burgerIngredientsStyle.container}`}>
        <p
          className={`text text_type_main-medium mt-10 mb-6 ${burgerIngredientsStyle.subtitle}`}
        >
          Булки
        </p>
        <ul className={`pb-15 ${burgerIngredientsStyle.list}`}>
          {props.data.map((item) => {
            if (item.type === 'bun') {
              return (
                <div
                  onClick={countIngredients}
                  style={{ position: 'relative' }}
                >
                  {!(counter === 0) ? (
                    <Counter
                      onClick={countIngredients}
                      count={counter}
                      size="default"
                    />
                  ) : null}
                  <IngredientsList
                    add={props.add}
                    key={item._id}
                    type={item.type}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    item={item}
                    onItemClick={props.onItemClick}
                  />
                </div>
              );
            }
          })}
        </ul>
        <div>
          <p
            className={`text text_type_main-medium mt-5 mb-5 ${burgerIngredientsStyle.subtitle}`}
          >
            Cоусы
          </p>
          <ul className={burgerIngredientsStyle.list}>
            {props.data.map((item, index) => {
              if (item.type === 'sauce') {
                return (
                  <div
                    onClick={countIngredients}
                    style={{ position: 'relative' }}
                  >
                    {!(counter === 0) ? (
                      <Counter
                        onClick={countIngredients}
                        count={counter}
                        size="default"
                      />
                    ) : null}
                    <IngredientsList
                      key={item._id}
                      type={item.type}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      item={item}
                      onItemClick={props.onItemClick}
                    />
                  </div>
                );
              }
            })}
          </ul>
        </div>
        <div>
          <p
            className={`text text_type_main-medium mt-5 mb-5 ${burgerIngredientsStyle.subtitle}`}
          >
            Начинки{' '}
          </p>
          <ul className={burgerIngredientsStyle.list}>
            {props.data.map((item) => {
              if (item.type === 'main') {
                return (
                  <div
                    onClick={countIngredients}
                    style={{ position: 'relative' }}
                  >
                    {!(counter === 0) ? (
                      <Counter
                        onClick={countIngredients}
                        count={counter}
                        size="default"
                      />
                    ) : null}
                    <IngredientsList
                      onClick={props.add}
                      key={item._id}
                      type={item.type}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      item={item}
                      onItemClick={props.onItemClick}
                    />
                  </div>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BurgerConstructor;
