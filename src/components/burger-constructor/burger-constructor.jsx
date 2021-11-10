import React from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDeatils from '../order-details/order-detail';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor() {
  const [modal, setModal] = React.useState(false);
  function handleOpenModal() {
    setModal(true);
  }
  function handleCloseModal() {
    setModal(false);
  }
  return (
    <section className={`pt-15 ${burgerConstructorStyle.burgerConstructor}`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
      />
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
      />
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
      />
      <div className={burgerConstructorStyle.sum}>
        <p className="text text_type_main-large mr-5">
          400
          <CurrencyIcon type="primary" />
        </p>
        <Button onClick={handleOpenModal} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>

      {modal ? (
        <Modal onClose={handleCloseModal}>
          <OrderDeatils />
        </Modal>
      ) : null}
    </section>
  );
}
export default BurgerConstructor;
