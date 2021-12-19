import * as api from "../api";

// ORDERS ACTIONS CREATOR
export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    const { data } = await api.createProduct(product);
    dispatch({ type: "CREATE", payload: data });
    // toast.success("Product submitted");
  } catch (error) {
    console.log(error.message);
    // toast.error(error.message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.deleteProduct(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};
