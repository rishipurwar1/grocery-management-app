import * as api from "../api";

// ORDERS ACTIONS CREATOR
export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await api.fetchOrders();
    dispatch({ type: "FETCH_ALL_ORDERS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createOrder = (order) => async (dispatch) => {
  try {
    const { data } = await api.createOrder(order);
    dispatch({ type: "CREATE_ORDER", payload: data });
    // toast.success("Product submitted");
  } catch (error) {
    console.log(error.message);
    // toast.error(error.message);
  }
};
