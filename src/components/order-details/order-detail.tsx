import React, { FC } from 'react';
import orderDetails from './order-details.module.css';
import done from 'images/done.gif';

const OrderDeatils: FC<{ number: number; name: string }> = ({
  number,
  name,
}) => {
  const russian = localStorage.getItem('rus');
  return (
    <div className={`pb-30 ${orderDetails.container}`}>
      <p className={'text text_type_digits-large pt-30'}>{number}</p>
      <p className={`text text_type_main-medium pt-8 ${orderDetails.name}`}>
        {name}
      </p>
      <img
        src={done}
        alt={russian ? 'Заказ готов' : 'The order is ready'}
        className={`pt-15 ${orderDetails.image}`}
      />
      <p className={'text text_type_main-small pt-15'}>
        {russian
          ? 'Ваш заказ начали готовить'
          : 'Your order is beeing prepared'}
      </p>
      <p className={'text text_type_main-small text_color_inactive pt-2'}>
        {russian
          ? 'Дождитесь готовности на орбитальной станции'
          : 'Wait till its ready at the orbital station'}
      </p>
    </div>
  );
};
export { OrderDeatils };
