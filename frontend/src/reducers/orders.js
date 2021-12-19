// eslint-disable-next-line
export default (orders = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_ORDERS":
      return action.payload;
    case "CREATE_ORDER":
      return [...orders, action.payload];
    default:
      return orders;
  }
};
