import React, { useCallback } from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import { Modal } from 'components/modal/modal';
import { ConstructorFoodElement } from './constructorElement/constructorFoodElement';
import { OrderDeatils } from '../order-details/order-detail';
import { useDispatch, useSelector } from '../../utils/hooks';
import { createOrder } from 'services/actions/order';
import { getCloseOrderModalAction } from 'services/actions/modal';
import { useDrop } from 'react-dnd';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  getAddIngredientsAction,
  getMoveIngredientsAction,
} from 'services/actions/constructor';
import { useNavigate } from 'react-router';
import { TItem } from 'utils/types';
const BurgerConstructor = () => {
  const constructorValue = useSelector(
    (store) => store.constructorValue.constructor
  );
  const loggedIn = useSelector((store) => store.auth.loggedIn);
  const { isModalOpen, isOrder } = useSelector((store) => store.modal);
  const { order, orderSuccess, orderRequest } = useSelector(
    (store) => store.order
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function finishOrder() {
    const accessToken = localStorage.getItem('accessToken');
    loggedIn
      ? dispatch(createOrder(orderIdentificators(), accessToken))
      : navigate('/login');
  }
  function orderIdentificators() {
    const arr = [constructorValue.bun[0]._id];
    for (let i = 0; i < constructorValue.other.length; i++) {
      arr.push(constructorValue.other[i]._id);
    }
    arr.push(constructorValue.bun[0]._id);
    return arr;
  }

  function handleCloseModal() {
    orderSuccess && dispatch(getCloseOrderModalAction());
  }

  function totalSum() {
    const sum = constructorValue.other.reduce(
      (acc: number, item: { price: number }) => {
        return acc + item.price;
      },
      0
    );
    return sum + constructorValue.bun[0].price * 2;
  }

  const [, dropTarget] = useDrop(
    () => ({
      accept: ['bun', 'sauce', 'main'],
      drop(item: TItem) {
        dispatch(getAddIngredientsAction(item));
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
        dispatch(getMoveIngredientsAction(newConstructor));
    },
    [dispatch, constructorValue]
  );

  return (
    <section
      ref={dropTarget}
      className={`pt-15 ${burgerConstructorStyle.burgerConstructor}`}
    >
      <div
        className={`${burgerConstructorStyle.constructor} ${
          constructorValue.bun.length === 0 &&
          constructorValue.other.length === 0 &&
          burgerConstructorStyle.empty
        }`}
      >
        {constructorValue.bun.length === 0 &&
          constructorValue.other.length === 0 && (
            <p
              className={`text text_type_main-medium ${burgerConstructorStyle.emptyParagraph}`}
            >
              Добавьте ингредиенты
            </p>
          )}
        <div className={burgerConstructorStyle.bun}>
          {constructorValue.bun.map((item: TItem, index: number) => {
            return (
              <div
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
        </div>
        {
          <div className={burgerConstructorStyle.container}>
            {constructorValue.other.map((item: TItem, index: number) => {
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
        <div className={burgerConstructorStyle.ingredient}>
          {constructorValue.bun.map((item: TItem, index: number) => {
            return (
              <div
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
        </div>
      </div>
      <div className={burgerConstructorStyle.sum}>
        <p className="text text_type_main-large mr-5">
          {constructorValue.bun.length > 0 &&
            constructorValue.other.length > 0 &&
            totalSum()}
          <CurrencyIcon type="primary" />
        </p>
        {constructorValue.bun.length > 0 &&
        constructorValue.other.length > 0 ? (
          <Button onClick={finishOrder} type="primary" size="large">
            Оформить заказ
          </Button>
        ) : (
          <Button disabled onClick={finishOrder} type="primary" size="large">
            Соберите бургер!
          </Button>
        )}
      </div>
      {isModalOpen && isOrder && orderSuccess && !orderRequest ? (
        <Modal onClose={handleCloseModal} title={''}>
          <OrderDeatils name={order.name} number={order.order.number} />
        </Modal>
      ) : (
        orderRequest && (
          <Modal onClose={handleCloseModal} title={''} isLoading={true}>
            <OrderDeatils
              name={'Подтверждаем заказ. Обычно это занимает 15 секунд'}
              number={''}
            />
          </Modal>
        )
      )}
    </section>
  );
};
export { BurgerConstructor };
