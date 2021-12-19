import { combineReducers } from "redux";

import orders from "./orders";
import products from "./products";
import uom from "./uom";

export const reducers = combineReducers({
  orders,
  products,
  uom,
});
