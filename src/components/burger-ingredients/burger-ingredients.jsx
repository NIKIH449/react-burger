import React, { useContext } from 'react';
import IngredientsList from './ingredients-list/ingredients-list';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { burgerIngredientsPropTypes } from '../../utils/type';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import { IngredientsContext } from 'context/IngredientsContext';
import { ConstructorContext } from 'context/ConstructorContext';

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('one');
  const [modal, setModal] = React.useState(false);
  const [ingredient, setIngredient] = React.useState(undefined);
  const ingredients = useContext(IngredientsContext);
  const { constructorValue, setConstructorValue } =
    useContext(ConstructorContext);

  function handleOpenModal(item) {
    setIngredient(item);
    setModal(true);
  }
  function handleCloseModal(e) {
    setIngredient({});
    setModal(false);
  }

  {
    /*function addToConstuctor(item) {
    {
      item.type === 'bun'
        ? setConstructorValue({
            bun: [item],
            other: [...constructorValue.other],
          })
        : setConstructorValue({
            bun: [...constructorValue.bun],
            other: [item, ...constructorValue.other],
          });
    }
  }*/
  }
  return (
    <section className={`mr-5 ${burgerIngredientsStyle.burgerIngredients}`}>
      <h1
        className={`text text_type_main-large pb-5 ${burgerIngredientsStyle.title}`}
      >
        Соберите бургер
      </h1>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
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
          {ingredients.ingredients.map((item) => {
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
            } else {
              return '';
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
            {ingredients.ingredients.map((item) => {
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
              } else {
                return '';
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
            {ingredients.ingredients.map((item) => {
              if (item.type === 'main') {
                return (
                  <IngredientsList
                    onItemClick={handleOpenModal}
                    type={item.type}
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    item={item}
                  />
                );
              } else {
                return '';
              }
            })}
          </ul>
        </div>
      </div>
      {modal && (
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
      )}
    </section>
  );
}

BurgerIngredients.propTypes = burgerIngredientsPropTypes;
export default BurgerIngredients;
