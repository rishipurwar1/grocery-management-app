import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProducts } from "../../actions/products";
import Button from "./Button";
import OrderInput from "./OrderInput";

const Item = ({ fieldId, remove, index }) => {
  const dispatch = useDispatch();
  const { control, setValue, register } = useFormContext();
  const { quantity, price } = useWatch({
    control,
    name: fieldId,
  });
  const { order_details } = useWatch({
    control,
  });

  useEffect(() => {
    setValue(`${fieldId}.total_price`, Number(quantity) * Number(price));
  }, [quantity, price, setValue, fieldId, order_details]);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const products = useSelector((state) => state.products);
  return (
    <div className="grid grid-rows-4 lg:grid-rows-1 grid-cols-1 lg:grid-cols-5 gap-y-4 gap-x-1 bg-white items-center p-4 bg-white block my-3">
      <div>
        {products.length > 0 ? (
          <select
            className="w-full p-3 rounded-md border focus:outline-none border border-gray-200 transition placeholder-blueGray-300 bg-gray-100 text-blueGray-600 font-bold text-xs"
            name={`${fieldId}.product_id`}
            id={`${fieldId}.product_id`}
            defaultValue={products[0].product_name}
            {...register(`${fieldId}.product_id`, { required: true })}
          >
            {products.map((product) => {
              return (
                <option value={product.product_id} key={product.product_id}>
                  {product.product_name}
                </option>
              );
            })}
          </select>
        ) : null}
      </div>
      <div>
        <OrderInput
          inputName={`${fieldId}.price`}
          type="number"
          className="w-full lg:w-max"
        />
      </div>
      <div>
        <OrderInput
          inputName={`${fieldId}.quantity`}
          type="number"
          className="w-full lg:w-max"
        />
      </div>
      <div className="flex items-center">
        <OrderInput
          inputName={`${fieldId}.total_price`}
          type="text"
          readOnly={true}
          className="w-full lg:w-max"
        />
        <span className="pl-1">Rs</span>
      </div>
      <div>
        <Button
          className="bg-red-500 w-full lg:w-max"
          aria-label="delete button"
          onClick={(e) => {
            e.preventDefault();
            remove(index);
          }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default Item;
