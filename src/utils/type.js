import PropTypes from 'prop-types';

const mainProTypes = {};

const constructorFoodElementPropTypes = {
  index: PropTypes.number.isRequired,
  moveIngredient: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const headerButtonProTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const burgerIngredientsPropTypes = {};

const ingredientsListPropTypes = {
  item: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
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

const orderDetailsPropTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const AuthFormPropTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  button: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  questionLink: PropTypes.string.isRequired,
  recovery: PropTypes.string.isRequired,
  recoveryLink: PropTypes.string.isRequired,
};

const profileButtonPropTypes = {
  onSignOut: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  link: PropTypes.string.isRequired,
};

const protectedRoutePropsTypes = {
  loggedIn: PropTypes.bool.isRequired,
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
  orderDetailsPropTypes,
  constructorFoodElementPropTypes,
  AuthFormPropTypes,
  profileButtonPropTypes,
  protectedRoutePropsTypes,
};
