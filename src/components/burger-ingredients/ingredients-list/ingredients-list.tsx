import React, { FC } from 'react';
import ingredientsListStyle from './ingredients-list.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from '../../../utils/hooks';
import { TItem } from 'utils/types';
const IngredientsList: FC<{
  item: TItem;
  image: string;
  name: string;
  price: number;
}> = ({ item, image, name, price }) => {
  const constructorValue = useSelector((store) => store.constructorValue);

  function countBun() {
    return (
      constructorValue.constructor.bun.filter(
        (element: { _id: string }) => element._id === item._id
      ).length * 2
    );
  }

  function countIngredients() {
    return constructorValue.constructor.other.filter(
      (element: { _id: string }) => element._id === item._id
    ).length;
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
};
export { IngredientsList };
