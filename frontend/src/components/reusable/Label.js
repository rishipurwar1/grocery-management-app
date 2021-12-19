import React from "react";

const Label = ({ children }) => {
  return (
    <label
      htmlFor={children}
      className="float-left font-bold py-2 text-gray-500"
    >
      {children}
    </label>
  );
};

export default Label;
