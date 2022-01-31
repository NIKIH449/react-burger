import React, { FC } from 'react';
import feedOrderInforamtionStyles from './order-information.module.css';
import { useSelector } from 'utils/hooks';
import { TFeedOrder, TItem } from 'utils/types';

const OrderInforamtion: FC<{ order: TFeedOrder }> = ({ order }) => {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const orderIngredients = findIngredients();
  const russian = localStorage.getItem('rus');

  function findIngredients() {
    let orderIngredients = [];
    for (let i = 0; i < order.ingredients.length; i++) {
      orderIngredients.push(
        ingredients.find((item: TItem) => item._id === order.ingredients[i])
      );
    }
    return orderIngredients;
  }
  const filterIngredients = orderIngredients
    .filter((item, i, arr) => arr.indexOf(item) === i)
    .map((item) => [item, orderIngredients.filter((x) => x === item).length]);

  function totalSum() {
    const sum = orderIngredients.reduce(
      (acc: number, item: { price: number } | undefined) => {
        return acc + item!.price;
      },
      0
    );
    return sum;
  }

  function parseDate(date: string) {
    const currentDate = new Date().getDate();
    const regex = /-/g;
    const orderDay = Number(date.replace(regex, '').split('T')[0].slice(-2));
    const orderTime = date.slice(11, -8);
    const term = currentDate - orderDay;
    return term === 0
      ? 'Ceгодня, ' + orderTime + ' i-GMT+3'
      : term === 1
      ? 'Вчера, ' + orderTime + ' i-GMT+3'
      : term < 5
      ? term + ' дня назад, ' + orderTime + ' i-GMT+3'
      : term + ' дней назад, ' + orderTime + ' i-GMT+3';
  }

  return (
    <div className={feedOrderInforamtionStyles.container}>
      <p
        className={`mb-10 text text_type_digits-default ${feedOrderInforamtionStyles.number}`}
      >
        #{order.number}
      </p>
      <h2 className="mb-3 text text_type_main-large">{order.name}</h2>
      <p
        className={`mb-15 text text_type_main-small ${feedOrderInforamtionStyles.status}`}
      >
        {order.status === 'done'
          ? russian
            ? 'Выполнен'
            : 'Done'
          : russian
          ? 'Готовится'
          : 'Cooking'}
      </p>
      <p className="mb-6 text text_type_main-medium">Состав</p>
      <div className={`mb-10 pr-6 ${feedOrderInforamtionStyles.ingredients}`}>
        {filterIngredients.map((item: any, index: number) => {
          return (
            <div key={index}>
              <div className={feedOrderInforamtionStyles.ingredient}>
                <div
                  className={feedOrderInforamtionStyles.image}
                  style={{
                    backgroundImage: 'url(' + item[0]?.image_mobile + ')',
                    backgroundPosition: 'center',
                  }}
                />
                <p className="text text_type_main-default">{item[0]?.name}</p>
                <p className="text text_type_digits-default">
                  {item[1]} x {item[0]?.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={feedOrderInforamtionStyles.info}>
        <p className="text text_type_main-small text_color_inactive">
          {parseDate(order.createdAt)}
        </p>
        <p className="text text_type_digits-default">{totalSum()}</p>
      </div>
    </div>
  );
};
export { OrderInforamtion };
