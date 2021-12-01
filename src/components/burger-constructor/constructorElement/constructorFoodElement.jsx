import React, { useRef } from 'react';
import ConstructorFoodElementStyle from './constructorFoodElement.module.css';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { DELETE_INGREDIENT } from 'services/actions/constructor';
import { constructorFoodElementPropTypes } from 'utils/type';

function ConstructorFoodElement(props) {
  const sortTarget = useRef(null);
  const dispatch = useDispatch();
  const constructorValue = useSelector(
    (store) => store.constructorValue.constructor.other
  );

  const [{ opacity }, drop] = useDrop(
    () => ({
      accept: 'sort',
      hover: (item) => {
        const dragIndex = constructorValue.findIndex(
          (element) => element._id === item._id
        );
        const hoverIndex = props.index;
        props.moveIngredient(dragIndex, hoverIndex);
      },
      collect: (monitor) => ({
        opacity: monitor.isOver() ? 0.2 : 1,
      }),
    }),

    [constructorValue]
  );

  const [, drag] = useDrag({
    type: 'sort',
    item: props.item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(sortTarget));

  return (
    <div
      style={{ opacity }}
      ref={sortTarget}
      key={props.index}
      className={ConstructorFoodElementStyle.ingredient}
    >
      <DragIcon />
      <ConstructorElement
        handleClose={() => {
          dispatch({
            type: DELETE_INGREDIENT,
            item: props.item._id + props.index,
          });
        }}
        text={props.item.name}
        price={props.item.price}
        thumbnail={props.item.image}
      />
    </div>
  );
}
ConstructorFoodElement.propTypes = constructorFoodElementPropTypes.isRequired;
export default ConstructorFoodElement;
