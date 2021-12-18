import React from 'react';
import ingredientsListStyle from './ingredients-list.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsListPropTypes } from '../../../utils/type';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { SET_CURRENT_ITEM } from 'services/actions/currentItem';

function IngredientsList({ item, image, name, price }) {
  const dispatch = useDispatch();
  const constructorValue = useSelector((store) => store.constructorValue);
  const navigate = useNavigate();

  function countBun() {
    return (
      constructorValue.constructor.bun.filter(
        (element) => element._id === item._id
      ).length * 2
    );
  }

  function countIngredients() {
    return constructorValue.constructor.other.filter(
      (element) => element._id === item._id
    ).length;
  }

  function handleClick() {
    dispatch({ type: SET_CURRENT_ITEM, data: item });
    navigate(`/ingredients/${item._id}`);
    localStorage.setItem('ingredientItem', JSON.stringify(item));
  }
  const [{ opacity }, ingredientRef] = useDrag({
    type: item.type,
    item: item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    }),
  });
  return (
    <li
      style={{ opacity }}
      ref={ingredientRef}
      onClick={handleClick}
      className={ingredientsListStyle.item}
    >
      {item.type === 'bun' ? (
        <Counter count={countBun()} size="default" />
      ) : (
        <Counter count={countIngredients()} size="default" />
      )}
      <img
        draggable
        className={ingredientsListStyle.image}
        src={image}
        alt={name}
      />
      <p className="text text_type_digits-default">
        {price} <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">{name}</p>
    </li>
  );
}
IngredientsList.propTypes = ingredientsListPropTypes.isRequired;
export default IngredientsList;
