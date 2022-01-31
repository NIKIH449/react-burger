import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { useSelector } from '../../utils/hooks';
import feedOrderStyle from './feed-order.module.css';
import { TItem } from '../../utils/types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

const FeedOrder: FC<{
  id: string;
  number: string;
  date: string;
  name: string;
  status: string;
  ingredients: TItem[] | string[];
}> = ({ number, date, name, ingredients, id, status }) => {
  const location = useLocation();
  const russian = localStorage.getItem('rus');
  const allIngredients = useSelector((store) => store.ingredients.ingredients);
  const orderIngredients = findIngredients();
  const imageStyle = (item: string, key: number) => ({
    backgroundImage: 'url(' + item + ')',
    backgroundPosition: 'center',
    zIndex: 999 - key,
  });

  function parseDate(date: string) {
    const currentDate = new Date();
    const regex = /-/g;
    const orderDay = Number(date.replace(regex, '').split('T')[0].slice(-2));
    const orderTime = date.slice(11, -8);
    const term = currentDate.getDate() - orderDay;
    return term === 0
      ? `${russian ? 'Cегодня' : 'Today'}, ${orderTime} i-GMT+3`
      : term === 1
      ? `${russian ? 'Вчера' : 'Yesterday'}, ${orderTime} i-GMT+3`
      : term < 5
      ? `${term} ${russian ? 'дня назад' : 'days ago'}, ${orderTime} i-GMT+3`
      : `${term} ${russian ? 'дней назад' : 'days ago'}, ${orderTime} i-GMT+3`;
  }

  function findIngredients() {
    let orderIngredients = [];
    for (let i = 0; i < ingredients.length; i++) {
      orderIngredients.push(
        allIngredients.find((item: TItem) => item._id === ingredients[i])
      );
    }
    return orderIngredients;
  }
  function totalSum() {
    const sum = orderIngredients.reduce(
      (acc: number, item: TItem | undefined) => {
        return acc + item!.price;
      },
      0
    );
    return sum;
  }
  return (
    <Link
      style={{ textDecoration: 'none', color: 'white' }}
      to={`${location.pathname}/${id}`}
      state={{ background: location.pathname }}
    >
      <div className={`${feedOrderStyle.container} mb-4 p-5`}>
        <div className={`${feedOrderStyle.tracking} pb-4`}>
          <p className="text text_type_digits-default">{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {parseDate(date)}
          </p>
        </div>

        <p className="mb-2 text text_type_main-medium">{name}</p>
        {location.pathname === '/profile/orders' && (
          <p className="text text_type_main-small">
            {status === 'done'
              ? russian
                ? 'Выполнен'
                : 'Done'
              : status === 'denied'
              ? russian
                ? 'Готовится'
                : 'Cooking'
              : russian
              ? 'Отменен'
              : 'Dismissed'}
          </p>
        )}
        <div className={`${feedOrderStyle.main} pt-4`}>
          <div className={feedOrderStyle.pictures}>
            {orderIngredients.map(
              (item: TItem | undefined, index: number, arr) => {
                if (item !== undefined) {
                  if (arr.length > 6 && index + 1 === ingredients.length) {
                    return (
                      <div key={index}>
                        <p
                          className={`text text_type_main-small ${feedOrderStyle.rest}`}
                        >
                          {ingredients.length > 6 &&
                            `+${ingredients.length - 6}`}
                        </p>
                        <div
                          style={imageStyle(item.image_mobile, index)}
                          className={feedOrderStyle.lastPicture}
                        ></div>
                      </div>
                    );
                  } else if (index === 0) {
                    return (
                      <div
                        style={imageStyle(item.image_mobile, index)}
                        className={feedOrderStyle.picture}
                        key={index}
                      ></div>
                    );
                  } else if (index < 5) {
                    return (
                      <div
                        style={imageStyle(item.image_mobile, index)}
                        className={feedOrderStyle.picture}
                        key={index}
                      ></div>
                    );
                  } else {
                    return '';
                  }
                } else {
                  return '';
                }
              }
            )}
          </div>
          <p
            className={`${feedOrderStyle.price} text text_type_digits-default`}
          >
            {allIngredients.length > 0 && totalSum()}
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    </Link>
  );
};
export { FeedOrder };
