import React, { useCallback, useEffect } from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDeatils from '../order-details/order-detail';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from 'services/actions/order';
import { closeOrderModal } from 'services/actions/modal';
import { useDrop } from 'react-dnd';
import {
  getConstructor,
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
} from 'services/actions/constructor';
import ConstructorFoodElement from './constructorElement/constructorFoodElement';

function BurgerConstructor() {
  const constructorValue = useSelector(
    (store) => store.constructorValue.constructor
  );
  const { isModalOpen, isOrder } = useSelector((store) => store.modal);
  const order = useSelector((store) => store.order.order);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConstructor());
  }, [dispatch]);

  function finishOrder() {
    dispatch(createOrder(orderIdentificators()));
  }
  function orderIdentificators() {
    const arr = [constructorValue.bun[0]._id];
    for (let i = 0; i < constructorValue.other.length; i++) {
      arr.push(constructorValue.other[i]._id);
    }
    return arr;
  }

  function handleCloseModal() {
    closeOrderModal(dispatch);
  }

  function totalSum() {
    const sum = constructorValue.other.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    return sum + constructorValue.bun[0].price * 2;
  }

  const [, dropTarget] = useDrop(
    () => ({
      accept: ['bun', 'sauce', 'main'],
      drop(item) {
        dispatch({
          type: ADD_INGREDIENT,
          currentItem: item,
        });
      },
    }),
    [constructorValue]
  );

  const moveIngredient = useCallback(
    (dragIndex, hoverIndex) => {
      const dragIngredient = constructorValue.other[dragIndex];
      const newConstructor = [...constructorValue.other];
      newConstructor.splice(dragIndex, 1);
      newConstructor.splice(hoverIndex, 0, dragIngredient);
      dragIndex !== hoverIndex &&
        dispatch({
          type: MOVE_INGREDIENT,
          item: newConstructor,
        });
    },
    [dispatch, constructorValue]
  );

  return (
    <section
      ref={dropTarget}
      className={`pt-15 ${burgerConstructorStyle.burgerConstructor}`}
    >
      {constructorValue.bun.length >= 1 &&
        constructorValue.bun.map((item, index) => {
          return (
            <div
              name="bun"
              key={String(item._id) + index}
              className={burgerConstructorStyle.ingredient}
            >
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${item.name} (верх)`}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          );
        })}
      {
        <div name="other" className={burgerConstructorStyle.container}>
          {constructorValue.other.length >= 1 &&
            constructorValue.other.map((item, index) => {
              return (
                <ConstructorFoodElement
                  item={item}
                  key={index}
                  index={index}
                  moveIngredient={moveIngredient}
                />
              );
            })}
        </div>
      }
      {constructorValue.bun.length >= 1 &&
        constructorValue.bun.map((item, index) => {
          return (
            <div
              name="bun"
              key={String(item._id) + index}
              className={burgerConstructorStyle.ingredient}
            >
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${item.name} (низ)`}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          );
        })}
      <div className={burgerConstructorStyle.sum}>
        <p className="text text_type_main-large mr-5">
          {constructorValue.bun.length > 0 && totalSum()}
          <CurrencyIcon type="primary" />
        </p>
        <Button onClick={finishOrder} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && isOrder && (
        <Modal onClose={handleCloseModal}>
          <OrderDeatils name={order.name} number={order.order.number} />
        </Modal>
      )}
    </section>
  );
}
export default BurgerConstructor;
