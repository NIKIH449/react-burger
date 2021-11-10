import PropTypes from 'prop-types';

const mainProTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const headerButtonProTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
};

const burgerIngredientsPropTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const ingredientsListPropTypes = {
  item: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

const ingredientsDetailsPropTypes = {
  image: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const modalOverlayPropTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
};

const modalPropTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
export {
  modalPropTypes,
  modalOverlayPropTypes,
  ingredientsDetailsPropTypes,
  mainProTypes,
  headerButtonProTypes,
  burgerIngredientsPropTypes,
  ingredientsListPropTypes,
};
