import React from "react";
const Input = ({ children, ...rest }) => {
  return (
    <input
      placeholder={children}
      id={children}
      className="px-3 py-2 placeholder-blueGray-300 bg-gray-100 text-blueGray-600 relative rounded text-sm border border-gray-200 outline-none focus:outline-none focus:ring w-full"
      {...rest}
    />
  );
};

export default Input;
