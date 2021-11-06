import React from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(props) {
  const [bag, setBag] = React.useState([]);

  React.useEffect(() => {
    setBag([props.bag, ...bag]);
  }, [props.bag]);

  return (
    <>
      <section className={`pt-15 ${burgerConstructorStyle.constructor}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
        <div className={burgerConstructorStyle.container}>
          {bag
            ? bag.map((item) => {
                return (
                  <div
                    key={item._id}
                    className={burgerConstructorStyle.ingredient}
                  >
                    <DragIcon />
                    <ConstructorElement
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </div>
                );
              })
            : null}
        </div>
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
          <Button type="primary" size="large">
            Нажми на меня
          </Button>
        </div>
      </section>
    </>
  );
}
export default BurgerConstructor;
