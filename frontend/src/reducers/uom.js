// eslint-disable-next-line
export default (uom = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_UOM":
      return action.payload;
    default:
      return uom;
  }
};
