import React from "react";
import { classNames } from "../../modules/misc";
import { useFormContext } from "react-hook-form";

const OrderInput = ({ inputName, type, className, ...rest }) => {
  const { register, formState: errors } = useFormContext();
  return (
    <input
      type={type}
      name={inputName}
      id={inputName}
      {...register(inputName, { required: true })}
      className={classNames(
        "p-3 rounded-md border focus:outline-none border border-gray-200 transition placeholder-blueGray-300 bg-gray-100 text-blueGray-600 font-bold text-xs",
        className
      )}
      {...rest}
    />
  );
};

export default OrderInput;
