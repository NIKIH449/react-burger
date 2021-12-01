import React from 'react';
import ingredientsListStyle from './ingredients-list.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsListPropTypes } from '../../../utils/type';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

function IngredientsList(props) {
  const constructorValue = useSelector((store) => store.constructorValue);

  function countBun() {
    return (
      constructorValue.constructor.bun.filter(
        (item) => item._id === props.item._id
      ).length * 2
    );
  }

  function countIngredients() {
    return constructorValue.constructor.other.filter(
      (item) => item._id === props.item._id
    ).length;
  }

  function handleClick() {
    props.onItemClick(props.item);
  }
  const [{ opacity }, ingredientRef] = useDrag({
    type: props.item.type,
    item: props.item,
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
      {props.item.type === 'bun' ? (
        <Counter count={countBun()} size="default" />
      ) : (
        <Counter count={countIngredients()} size="default" />
      )}
      <img
        draggable
        className={ingredientsListStyle.image}
        src={props.image}
        alt={props.name}
      />
      <p className="text text_type_digits-default">
        {props.price} <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">{props.name}</p>
    </li>
  );
}
IngredientsList.propTypes = ingredientsListPropTypes;
export default IngredientsList;
