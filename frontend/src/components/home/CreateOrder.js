import React, { useEffect } from "react";
import {
  useForm,
  useFieldArray,
  FormProvider,
  useWatch,
} from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../actions/orders";
import Button from "../reusable/Button";
import Item from "../reusable/Item";
import OrderInput from "../reusable/OrderInput";

const CreateOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formMethods = useForm({
    defaultValues: {
      grand_total: 0,

      order_details: [],
    },
  });
  const { control, handleSubmit, setValue, reset } = formMethods;
  const { order_details } = useWatch({
    control,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "order_details",
  });
  let orderDetailsLength =
    order_details.length !== 0 &&
    order_details[order_details.length - 1]?.total_price;

  useEffect(() => {
    let grand_total = 0;
    order_details?.forEach((item) => {
      grand_total += item.total_price;
    });
    setValue("grand_total", grand_total);
  }, [setValue, order_details, orderDetailsLength]);

  const onSubmit = async (data) => {
    await dispatch(createOrder(data));
    navigate("/");
  };
  return (
    <div className="max-w-5xl mx-auto rounded flex flex-col mt-5">
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="h-screen"
        >
          <div className="border-b border-gray-300 p-4 flex justify-between items-center bg-white">
            <h1 className="text-xl text-black opacity-70 font-normal  text-left">
              New Order
            </h1>
            <OrderInput
              inputName="customer_name"
              type="text"
              placeholder="Customer Name"
            />
          </div>
          <div class="grid grid-cols-5 bg-white p-2 items-center">
            <div>
              <label className="font-semibold text-gray-500">Product</label>
            </div>
            <div>
              <label className="font-semibold text-gray-500">Price</label>
            </div>
            <div>
              <label className="font-semibold text-gray-500">Quantity</label>
            </div>
            <div>
              <label className="font-semibold text-gray-500">Total</label>
            </div>
            <div>
              <Button
                className="bg-blue-700"
                onClick={(e) => {
                  e.preventDefault();
                  append({
                    product_id: "",
                    quantity: "",
                    total_price: "",
                  });
                  <span className="font-semibold mr-1">+</span>;
                }}
              >
                Add More
              </Button>
            </div>
          </div>
          <div className="my-4 w-full">
            {fields.map((order, index) => {
              return (
                <Item
                  key={order.id}
                  index={index}
                  fieldId={`order_details.${index}`}
                  remove={remove}
                />
              );
            })}
          </div>
          <div className="flex flex-col justify-end items-end bg-white p-4">
            <div className="flex items-center">
              <span className="font-bold text-sm text-gray-500">Total</span>
              <span className="mx-2">
                <OrderInput
                  inputName="grand_total"
                  type="number"
                  readOnly={true}
                />
              </span>
              <span className="pr-2 font-bold text-sm">Rs</span>
            </div>
            <Button type="submit" className="bg-blue-700">
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateOrder;
