import React, { FC, useRef } from 'react';
import ConstructorFoodElementStyle from './constructorFoodElement.module.css';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../../utils/hooks';
import { useDrag, useDrop } from 'react-dnd';
import { getDeleteIngredientAction } from 'services/actions/constructor';
import { TItem } from 'utils/types';
const ConstructorFoodElement: FC<{
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  index: number;
  item: TItem;
}> = ({ moveIngredient, index, item }) => {
  const sortTarget = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const constructorValue = useSelector(
    (store) => store.constructorValue.constructor.other
  );

  const [{ opacity }, drop] = useDrop(
    () => ({
      accept: 'sort',
      hover: (item: { _id: string }) => {
        const dragIndex = constructorValue.findIndex(
          (element: { _id: string }) => element._id === item._id
        );
        const hoverIndex = index;
        moveIngredient(dragIndex, hoverIndex);
      },
      collect: (monitor) => ({
        opacity: monitor.isOver() ? 0.2 : 1,
      }),
    }),

    [constructorValue]
  );

  const [, drag] = useDrag({
    type: 'sort',
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(sortTarget));

  return (
    <div
      style={{ opacity }}
      ref={sortTarget}
      key={index}
      className={ConstructorFoodElementStyle.ingredient}
    >
      <DragIcon type={'secondary'} />
      <ConstructorElement
        handleClose={() => {
          dispatch(getDeleteIngredientAction(item._id + index));
        }}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </div>
  );
};
export { ConstructorFoodElement };
