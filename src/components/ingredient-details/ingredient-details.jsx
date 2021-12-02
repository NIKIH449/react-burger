import React from 'react';
import ingredientDetailsStyle from './ingredient-details.module.css';
import { ingredientsDetailsPropTypes } from 'utils/type';

function IngredientDetails({image, name, calories, proteins, fat, carbohydrates}) {
  return (
    <div className={`pt-15 pb-15 ${ingredientDetailsStyle.ingredientDetails}`}>
      <img
        src={image}
        alt={name}
        className={ingredientDetailsStyle.image}
      />
      <p className={`text text_type_main-medium pt-4 ${ingredientDetailsStyle.name}`}>{name}</p>
      <ul  className={`pt-8 ${ingredientDetailsStyle.list}`}>
        <li className={'mr-5'}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{calories}</p>
        </li>
        <li className={'mr-5'}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
        </li>
        <li className={'mr-5'}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{fat}</p>
        </li>
        <li className={'mr-5'}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}
IngredientDetails.propTypes = ingredientsDetailsPropTypes.isRequired;
export default IngredientDetails;
