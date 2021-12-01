export const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM';

export function setCurrentItem(dispatch, item) {
  dispatch({
    type: SET_CURRENT_ITEM,
    currentItem: item,
  });
}
