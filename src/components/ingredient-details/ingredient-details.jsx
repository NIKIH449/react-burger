import React from 'react';
import ingredientDetailsStyle from './ingredient-details.module.css';
import { ingredientsDetailsPropTypes } from 'utils/type';

function IngredientDetails(props) {
  return (
    <div className={`pt-15 pb-15 ${ingredientDetailsStyle.ingredientDetails}`}>
      <img
        src={props.image}
        alt={props.name}
        className={ingredientDetailsStyle.image}
      />
      <p className={`text text_type_main-medium pt-4 ${ingredientDetailsStyle.name}`}>{props.name}</p>
      <ul  className={`pt-8 ${ingredientDetailsStyle.list}`}>
        <li className={'mr-5'}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{props.calories}</p>
        </li>
        <li className={'mr-5'}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.proteins}</p>
        </li>
        <li className={'mr-5'}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.fat}</p>
        </li>
        <li className={'mr-5'}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}
IngredientDetails.propTypes = ingredientsDetailsPropTypes;
export default IngredientDetails;
