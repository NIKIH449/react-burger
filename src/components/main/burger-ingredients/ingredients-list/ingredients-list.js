import React from 'react';
import ingredientsListStyle from './ingredients-list.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientsList(props) {
  function handleClick() {
    props.onItemClick(props.item);
  }
  return (
    <li className={ingredientsListStyle.item} onClick={handleClick}>
      <img
        className={ingredientsListStyle.image}
        src={props.image}
        alt={props.image}
      />
      <p className="text text_type_digits-default">
        {props.price} <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">{props.name}</p>
    </li>
  );
}

export default IngredientsList;
