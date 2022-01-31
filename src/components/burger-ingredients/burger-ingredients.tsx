import React, { useEffect, useRef } from 'react';
import { IngredientsList } from './ingredients-list/ingredients-list';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../utils/hooks';
import { getIngredients } from 'services/actions/ingredients';
import { Link, useLocation } from 'react-router-dom';
import { TItem } from 'utils/types';
import { wsConnectionClosed } from 'services/actions/wsFeed';
const BurgerIngredients = () => {

  const [current, setCurrent] = React.useState('one');
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const russian = localStorage.getItem('rus');
  const location = useLocation();
  const dispatch = useDispatch();
  const bunRef = useRef<HTMLParagraphElement>(null);
  const sauseRef = useRef<HTMLParagraphElement>(null);
  const mainRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { wsConnected } = useSelector((store) => store.wsFeed);

  useEffect(() => {
    wsConnected && dispatch(wsConnectionClosed());
  }, [wsConnected, dispatch]);

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

  return (
    <section className={`mr-5 ${burgerIngredientsStyle.burgerIngredients}`}>
      <h1
        className={`text text_type_main-large pb-5 ${burgerIngredientsStyle.title}`}
      >
        {russian ? 'Соберите бургер' : 'Build a burger'}
      </h1>
      <div style={{ display: 'flex' }}>
        <Tab onClick={scrollToBun} value="one" active={current === 'one'}>
          {russian ? 'Булки' : 'Buns'}
        </Tab>
        <Tab onClick={scrollToSause} value="two" active={current === 'two'}>
          {russian ? 'Соусы' : 'Sauces'}
        </Tab>
        <Tab onClick={scrollToMain} value="three" active={current === 'three'}>
          {russian ? 'Начинки' : 'Main'}
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
          {russian ? 'Булки' : 'Buns'}
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
            {russian ? 'Соусы' : 'Sauces'}
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
            {russian ? 'Начинки' : 'Main'}
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
    </section>
  );
};

export { BurgerIngredients };
