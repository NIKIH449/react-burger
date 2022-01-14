import React, { useEffect, useRef } from 'react';
import { IngredientsList } from './ingredients-list/ingredients-list';
import { IngredientDetails } from 'components/ingredient-details/ingredient-details';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from 'services/actions/ingredients';
import { closeIngredientModal } from 'services/actions/modal';
import { Link, useLocation } from 'react-router-dom';
import { TItem } from 'utils';
const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('one');
  const ingredients = useSelector(
    (store: any) => store.ingredients.ingredients
  );
  const ingredient = useSelector((store: any) => store.currentItem.currentItem);
  const { isModalOpen, isIngredient } = useSelector(
    (store: any) => store.modal
  );
  const location = useLocation();
  const bunRef = useRef<HTMLParagraphElement>(null);
  const sauseRef = useRef<HTMLParagraphElement>(null);
  const mainRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToBun = () => {
    if (bunRef !== null && bunRef.current !== null) {
      setCurrent('one');
      bunRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToSause = () => {
    if (sauseRef !== null && sauseRef.current !== null) {
      setCurrent('two');
      sauseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToMain = () => {
    if (mainRef !== null && mainRef.current !== null) {
      setCurrent('three');
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    ingredients.length === 0 && dispatch(getIngredients());
  }, [dispatch, ingredients.length]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    const scrollY = (e.target as HTMLElement).scrollTop;
    const sauseY = (sauseRef.current as HTMLParagraphElement).offsetTop / 2;
    const mainY = (mainRef.current as HTMLParagraphElement).offsetTop / 2;

    scrollY > sauseY && scrollY < mainY + sauseY
      ? setCurrent('two')
      : scrollY >= mainY + sauseY
      ? setCurrent('three')
      : setCurrent('one');
  };

  function handleCloseModal() {
    closeIngredientModal(dispatch);
  }

  return (
    <section className={`mr-5 ${burgerIngredientsStyle.burgerIngredients}`}>
      <h1
        className={`text text_type_main-large pb-5 ${burgerIngredientsStyle.title}`}
      >
        Соберите бургер
      </h1>
      <div style={{ display: 'flex' }}>
        <Tab onClick={scrollToBun} value="one" active={current === 'one'}>
          Булки
        </Tab>
        <Tab onClick={scrollToSause} value="two" active={current === 'two'}>
          Соусы
        </Tab>
        <Tab onClick={scrollToMain} value="three" active={current === 'three'}>
          Начинки
        </Tab>
      </div>

      <div
        onScroll={handleScroll}
        ref={scrollRef}
        className={`${burgerIngredientsStyle.container}`}
      >
        <p
          ref={bunRef}
          className={`text text_type_main-medium mt-10 mb-6 ${burgerIngredientsStyle.subtitle}`}
        >
          Булки
        </p>
        <ul id="bun" className={`pb-15 ${burgerIngredientsStyle.list}`}>
          {ingredients.map((item: TItem) => {
            if (item.type === 'bun') {
              return (
                <Link
                  style={{ textDecoration: 'none' }}
                  key={item._id}
                  to={`/ingredients/${item._id}`}
                  state={{ background: location.pathname }}
                >
                  <IngredientsList
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    item={item}
                  />
                </Link>
              );
            } else {
              return '';
            }
          })}
        </ul>
        <div>
          <p
            ref={sauseRef}
            className={`text text_type_main-medium mt-5 mb-5 ${burgerIngredientsStyle.subtitle}`}
          >
            Cоусы
          </p>
          <ul className={burgerIngredientsStyle.list}>
            {ingredients.map((item: TItem) => {
              if (item.type === 'sauce') {
                return (
                  <Link
                    style={{ textDecoration: 'none' }}
                    key={item._id}
                    to={`/ingredients/${item._id}`}
                    state={{ background: location.pathname }}
                  >
                    <IngredientsList
                      key={item._id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      item={item}
                    />
                  </Link>
                );
              } else {
                return '';
              }
            })}
          </ul>
        </div>
        <div>
          <p
            ref={mainRef}
            className={`text text_type_main-medium mt-5 mb-5 ${burgerIngredientsStyle.subtitle}`}
          >
            Начинки{' '}
          </p>
          <ul className={burgerIngredientsStyle.list}>
            {ingredients.map((item: TItem) => {
              if (item.type === 'main') {
                return (
                  <Link
                    style={{ textDecoration: 'none' }}
                    key={item._id}
                    to={`/ingredients/${item._id}`}
                    state={{ background: location.pathname }}
                  >
                    <IngredientsList
                      key={item._id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      item={item}
                    />
                  </Link>
                );
              } else {
                return '';
              }
            })}
          </ul>
        </div>
      </div>
      {isModalOpen && isIngredient && (
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
};

export { BurgerIngredients };
