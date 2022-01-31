import React from 'react';
import { useDispatch, useSelector } from '../utils/hooks';
import ingredientStyles from './ingredient.module.css';
import { IngredientDetails } from 'components/ingredient-details/ingredient-details';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Modal } from 'components/modal/modal';
import Main from 'components/main/main';

import { getCloseIngredientModalAction } from 'services/actions/modal';
const Ingredient = () => {
  const currentId = useParams();
  const { state } = useLocation();
  const russian = localStorage.getItem('rus');
  const navigate = useNavigate();
  const ingredients = useSelector(
    (store) => store.ingredients.ingredients
  );
  const ingredient = ingredients.filter(
    (item: { _id: string }) => currentId.id === item._id
  )[0];
  const dispatch = useDispatch();

  //useEffect(() => {
  //  ingredients.length === 0 && dispatch(getIngredients());
  //}, [dispatch, ingredients.length]);

  function handleCloseModal() {
    dispatch(getCloseIngredientModalAction());
    navigate('/');
  }
  return (
    <>
      {state && <Main></Main>}
      {state && ingredient ? (

        <Modal
          title={russian ? 'Детали ингридиента' : 'Details of ingredient'}
          onClose={handleCloseModal}
          isLoading={false}
        >

          <IngredientDetails
            name={ingredient.name}
            image={ingredient.image}
            calories={ingredient.calories}
            carbohydrates={ingredient.carbohydrates}
            fat={ingredient.fat}
            proteins={ingredient.proteins}
          ></IngredientDetails>
        </Modal>
      ) : (
        <div className={ingredientStyles.ingredient}>
          {ingredient && (
            <>
              <h2 className={'pb-4 pt-30 text text_type_main-large'}>
              {russian ? 'Детали ингридиента' : 'Details of ingredient'}
              </h2>
              <IngredientDetails
                name={ingredient.name}
                image={ingredient.image}
                calories={ingredient.calories}
                carbohydrates={ingredient.carbohydrates}
                fat={ingredient.fat}
                proteins={ingredient.proteins}
              ></IngredientDetails>
            </>
          )}
        </div>
      )}
    </>
  );
};

export { Ingredient };
