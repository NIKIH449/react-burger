import React from 'react';
import orderDetails from './order-details.module.css';
import done from 'images/done.gif';
import { orderDetailsPropTypes } from 'utils/type';

function OrderDeatils({number, name}) {
  return (
    <div className={`pb-30 ${orderDetails.container}`}>
      <p className={'text text_type_digits-large pt-30'}>{number}</p>
      <p className={`text text_type_main-medium pt-8 ${orderDetails.name}`}>{name}</p>
      <img src={done} alt="Заказ готов"className={`pt-15 ${orderDetails.image}`} />
      <p className={'text text_type_main-small pt-15'}>
        Ваш заказ начали готовить
      </p>
      <p className={'text text_type_main-small text_color_inactive pt-2'}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
OrderDeatils.propTypes = orderDetailsPropTypes.isRequired;
export default OrderDeatils;
