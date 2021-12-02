import React from 'react';
import ingredientsListStyle from './ingredients-list.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsListPropTypes } from '../../../utils/type';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

function IngredientsList({item, onItemClick, image, name, price}) {
  const constructorValue = useSelector((store) => store.constructorValue);

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
    onItemClick(item);
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
