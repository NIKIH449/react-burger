import { FeedOrder } from 'components/feed-order/feed-order';
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { getIngredients } from 'services/actions/ingredients';
import { wsConnectionStart } from 'services/actions/wsFeed';
import { useDispatch, useSelector } from 'utils/hooks';
import { TFeedOrder } from 'utils/types';
import feedStyle from './feed.module.css';
const Feed = () => {
  const location = useLocation();
  const currentId = useParams();
  const allIngredients = useSelector((store) => store.ingredients.ingredients);
  const { feed } = useSelector((store) => store.wsFeed);
  const orders = useSelector((store) => store.wsFeed.feed.orders) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    allIngredients.length === 0 && dispatch(getIngredients());
  }, [dispatch, allIngredients.length]);

  useEffect(() => {
    ((orders.length === 0 && location.pathname === '/feed') ||
      (orders.length === 0 && location.pathname === `/feed/${currentId.id}`)) &&
      dispatch(wsConnectionStart());
    console.log(orders.length);
  }, [currentId.id, dispatch, location.pathname, orders.length]);

  return (
    <section className={`mt-25 ${feedStyle.feed}`}>
      <div className={feedStyle.container}>
        <div className={`mr-15 ${feedStyle.orderList}`}>
          <h2 className="mb-5 text text_type_main-large">Лента заказов</h2>
          {orders.map((item: TFeedOrder, index: number) => (
            <FeedOrder
              status={item.status}
              id={item._id}
              key={index}
              name={item.name}
              date={item.createdAt}
              number={'#' + String(item.number)}
              ingredients={item.ingredients}
            />
          ))}
        </div>
        <div className={feedStyle.orderInforamtion}>
          <div className={`mb-15 ${feedStyle.container}`}>
            <div className={feedStyle.orderTable}>
              <div>
                <p
                  className={`mb-6 text text_type_main-medium ${feedStyle.orderTableTitle}`}
                >
                  Готовы:
                </p>
              </div>
              <div className={`mr-9 ${feedStyle.orders}`}>
                {orders.map((item: TFeedOrder, index: number) => {
                  if (item.status === 'done') {
                    return (
                      <p
                        className={`mb-2 text text_type_digits-default ${feedStyle.orderTableInProgress}`}
                        key={index}
                      >
                        {item.number}
                      </p>
                    );
                  } else {
                    return '';
                  }
                })}
              </div>
            </div>
            <div className={feedStyle.orderTable}>
              <div></div>
              <p
                className={`mb-6 text text_type_main-medium ${feedStyle.orderTableTitle}`}
              >
                В работе:
              </p>
              <div className={feedStyle.orders}>
                {orders.map((item: TFeedOrder, index: number) => {
                  if (item.status === 'pending') {
                    return (
                      <p
                        className="mb-2 text text_type_digits-default"
                        key={index}
                      >
                        {item.number}
                      </p>
                    );
                  } else {
                    return '';
                  }
                })}
              </div>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium">
              Выполнено за все время:
            </p>
            <p
              className={`${feedStyle.numberShadow} mb-15 text text_type_digits-large`}
            >
              {feed.total}
            </p>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p
              className={`${feedStyle.numberShadow} text text_type_digits-large`}
            >
              {feed.totalToday}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export { Feed };
