import React, { useContext, useState } from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDeatils from '../order-details/order-detail';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorContext } from 'context/ConstructorContext';
import * as api from 'utils/Api';
import { OrderContext } from 'context/OrderContext';

function BurgerConstructor() {
  const { order, setOrder } = useContext(OrderContext);
  const [modal, setModal] = useState(false);
  const constructorValue = useContext(ConstructorContext);

  function finishOrder() {
    api
      .sentOrder(orderIdentificators())
      .then((res) => {
        setOrder(res);
        handleOpenModal();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleOpenModal() {
    setModal(true);
  }
  function handleCloseModal() {
    setModal(false);
  }

  function orderIdentificators() {
    const arr = [constructorValue.constructorValue.bun[0]._id];
    for (let i = 0; i < constructorValue.constructorValue.other.length; i++) {
      arr.push(constructorValue.constructorValue.other[i]._id);
    }
    return arr;
  }

  function totalSum() {
    let sumOther = 0;
    let sumBun = constructorValue.constructorValue.bun[0].price;
    for (let i = 0; i < constructorValue.constructorValue.other.length; i++) {
      sumOther += constructorValue.constructorValue.other[i].price;
    }
    return sumOther + sumBun * 2;
  }
  return (
    <section className={`pt-15 ${burgerConstructorStyle.burgerConstructor}`}>
      {constructorValue.constructorValue.bun.map((item) => {
        return (
          <div key={item._id} className={burgerConstructorStyle.ingredient}>
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
        <div className={burgerConstructorStyle.container}>
          {constructorValue.constructorValue.other.map((item) => {
            return (
              <div key={item._id} className={burgerConstructorStyle.ingredient}>
                <DragIcon />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            );
          })}
        </div>
      }
      {constructorValue.constructorValue.bun.map((item) => {
        return (
          <div key={item._id} className={burgerConstructorStyle.ingredient}>
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
          {totalSum()}
          <CurrencyIcon type="primary" />
        </p>
        <Button onClick={finishOrder} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
      {modal && (
        <Modal onClose={handleCloseModal}>
          <OrderDeatils name={order.name} number={order.order.number} />
        </Modal>
      )}
    </section>
  );
}
export default BurgerConstructor;
