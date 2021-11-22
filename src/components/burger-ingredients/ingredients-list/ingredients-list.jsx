import React from 'react';
import ingredientsListStyle from './ingredients-list.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsListPropTypes } from '../../../utils/type';

function IngredientsList(props) {
  function handleClick() {
    props.onItemClick(props.item)
  }
  return (
    <li onClick={handleClick} className={ingredientsListStyle.item}>
      <img
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
