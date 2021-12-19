import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

export const fetchOrders = () => API.get("/orders");
export const createOrder = (newOrder) => API.post("/order", newOrder);

// products routes
export const fetchProducts = () => API.get("/products");
export const createProduct = (newProduct) => API.post("/product", newProduct);
export const deleteProduct = (id) => API.post("/delete", { product_id: id });

// uom routes
export const fetchUOM = () => API.get("/uom");
