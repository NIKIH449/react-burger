import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ingredientStyles from './ingredient.module.css';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getIngredients } from 'services/actions/ingredients';
import Modal from 'components/modal/modal';
import Main from 'components/main/main';
import { closeIngredientModal } from 'services/actions/modal';
export function Ingredient() {
  const currentId = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const ingredient = ingredients.filter((item) => currentId.id === item._id)[0];
  const dispatch = useDispatch();

  useEffect(() => {
    ingredients.length === 0 && dispatch(getIngredients());
  }, [dispatch, ingredients.length]);

  function handleCloseModal() {
    closeIngredientModal(dispatch);
    navigate('/');
  }
  return (
    <>
      {state && <Main></Main>}
      {state && ingredient ? (
        <Modal title="Детали ингридиента" onClose={handleCloseModal}>
          <IngredientDetails
            id={ingredient._id}
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
                Детали ингридиента
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
}
