import PropTypes from 'prop-types';

const mainProTypes = {
  data: PropTypes.arrayOf(
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
  ),
};

const headerButtonProTypes = {
  name: PropTypes.string.isRequired,
};

const burgerIngredientsPropTypes = {
  onItemClick: PropTypes.func.isRequired,
};

const ingredientsListPropTypes = {
  item: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export {
  mainProTypes,
  headerButtonProTypes,
  burgerIngredientsPropTypes,
  ingredientsListPropTypes,
};
