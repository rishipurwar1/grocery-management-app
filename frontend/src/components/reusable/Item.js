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
    <div className="grid grid-cols-5 bg-white p-2 items-center p-4 bg-white block my-3">
      <div>
        {products.length > 0 ? (
          <select
            className="w-full p-3 rounded-md border focus:outline-none border border-gray-200 transition text-black font-bold text-xs"
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
        <OrderInput inputName={`${fieldId}.price`} type="number" />
      </div>
      <div>
        <OrderInput inputName={`${fieldId}.quantity`} type="number" />
      </div>
      <div>
        <OrderInput
          inputName={`${fieldId}.total_price`}
          type="text"
          readOnly={true}
        />
        <span className="pl-1">Rs</span>
      </div>
      <div>
        <Button
          className="bg-red-500"
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
