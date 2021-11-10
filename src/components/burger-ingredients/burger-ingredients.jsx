import React from 'react';
import IngredientsList from './ingredients-list/ingredients-list';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { burgerIngredientsPropTypes } from '../../utils/type';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one');
  const [modal, setModal] = React.useState(false);
  const [ingredient, setIngredient] = React.useState({});

  function handleOpenModal(item) {
    setIngredient(item);
    setModal(true);
  }

  function handleCloseModal(e) {
    setIngredient({});
    setModal(false);
  }

  return (
    <section className={`mr-5 ${burgerIngredientsStyle.ingredinets}`}>
      <h1
        className={`text text_type_main-large pb-5 ${burgerIngredientsStyle.title}`}
      >
        Соберите бургер
      </h1>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          One
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Three
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
                <IngredientsList
                  onItemClick={handleOpenModal}
                  key={item._id}
                  type={item.type}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  item={item}
                />
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
            {props.data.map((item) => {
              if (item.type === 'sauce') {
                return (
                  <IngredientsList
                    onItemClick={handleOpenModal}
                    key={item._id}
                    type={item.type}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    item={item}
                  />
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
                  <IngredientsList
                    type={item.type}
                    onItemClick={handleOpenModal}
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    item={item}
                  />
                );
              }
            })}
          </ul>
        </div>
      </div>
      {modal ? (
        <Modal title="Детали ингридиента" onClose={handleCloseModal}>
          <IngredientDetails
            name={ingredient.name}
            image={ingredient.image}
            calories={ingredient.calories}
            carbohydrates={ingredient.carbohydrates}
            fat={ingredient.fat}
            proteins={ingredient.proteins}
          ></IngredientDetails>
        </Modal>
      ) : null}
    </section>
  );
}

BurgerIngredients.propTypes = burgerIngredientsPropTypes;
export default BurgerIngredients;
