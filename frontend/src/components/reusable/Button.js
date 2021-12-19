import React from "react";
import { classNames } from "../../modules/misc";

const Button = ({ children, className, ...rest }) => {
  return (
    <button
      className={classNames(
        "text-white font-medium uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 cursor-pointer",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export const PageButton = ({ children, className, ...rest }) => {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
