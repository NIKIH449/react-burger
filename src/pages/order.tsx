import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'utils/hooks';
import { Feed } from './feed';
import { getCloseIngredientModalAction } from 'services/actions/modal';
import { OrderInforamtion } from 'components/order-information/order-information';
import { Modal } from 'components/modal/modal';
import { Profile } from './profile';
import { wsConnectionStart } from 'services/actions/wsFeed';

const Order = () => {
  const currentId = useParams();
  const location = useLocation();
  const { state }: any = useLocation();
  const navigate = useNavigate();
  const userOrders = useSelector((store) => store.wsFeed.userFeed.orders) || [];
  const orders = useSelector((store) => store.wsFeed.feed.orders) || [];
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const findOrder = orders.filter(
    (item: { _id: string }) => currentId.id === item._id
  )[0];

  const findUserOrder = userOrders.filter(
    (item: { _id: string }) => currentId.id === item._id
  )[0];
  const dispatch = useDispatch();

  useEffect(() => {
    userOrders.length === 0 && state === null && dispatch(wsConnectionStart());
  }, [ingredients.length, userOrders.length, dispatch, state]);

  function handleCloseModal() {
    dispatch(getCloseIngredientModalAction());
    navigate(state.background);
  }
  return (
    <>
      {state &&
        ingredients.length &&
        !(location.pathname === `/profile/orders/${currentId.id}`) && <Feed />}
      {state &&
        ingredients.length &&
        location.pathname === `/profile/orders/${currentId.id}` && <Profile />}
      {(state && findOrder) || (state && findUserOrder) ? (
        <Modal onClose={handleCloseModal} title={''}>
          <OrderInforamtion
            order={orders.length > 0 ? findOrder : findUserOrder}
          ></OrderInforamtion>
        </Modal>
      ) : (
        <div>
          {(findOrder || findUserOrder) && (
            <OrderInforamtion
              order={orders.length > 0 ? findOrder : findUserOrder}
            ></OrderInforamtion>
          )}
        </div>
      )}
    </>
  );
};
export { Order };
