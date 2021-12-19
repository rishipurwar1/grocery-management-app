// eslint-disable-next-line
export default (products = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...products, action.payload];
    case "DELETE":
      return products.filter(
        (product) => product.product_id !== action.payload
      );
    default:
      return products;
  }
};
