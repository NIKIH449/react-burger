import React, { FC } from 'react';
import ingredientDetailsStyle from './ingredient-details.module.css';
const IngredientDetails: FC<{
  image: string;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}> = ({ image, name, calories, proteins, fat, carbohydrates }) => {

    const russian = localStorage.getItem('rus');

  return (
    <div className={`pt-15 pb-15 ${ingredientDetailsStyle.ingredientDetails}`}>
      <img src={image} alt={name} className={ingredientDetailsStyle.image} />
      <p
        className={`text text_type_main-medium pt-4 ${ingredientDetailsStyle.name}`}
      >
        {name}
      </p>
      <ul className={`pt-8 ${ingredientDetailsStyle.list}`}>
        <li className={'mr-5'}>
          <p className="text text_type_main-default text_color_inactive">
            {russian ? 'Калории,ккал' : 'Calories'}
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {calories}
          </p>
        </li>
        <li className={'mr-5'}>
          <p className="text text_type_main-default text_color_inactive">
            {russian ? 'Белки, г' : 'Proteins'}
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {proteins}
          </p>
        </li>
        <li className={'mr-5'}>
          <p className="text text_type_main-default text_color_inactive">
            {russian ? ' Жиры, г' : 'Fat'}
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {fat}
          </p>
        </li>
        <li className={'mr-5'}>
          <p className="text text_type_main-default text_color_inactive">
            {russian ? ' Углеводы, г' : 'Carbohydrates'}
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};
export { IngredientDetails };
