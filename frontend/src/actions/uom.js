import * as api from "../api";

// ORDERS ACTIONS CREATOR
export const getUOM = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUOM();
    dispatch({ type: "FETCH_ALL_UOM", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
