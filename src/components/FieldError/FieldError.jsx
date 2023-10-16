import React from "react";

export const FieldError = ({ children, className = "", ...props }) => {
  return (
    <label style={{color:"red"}} className={className} {...props}>
      {children}
    </label>
  );
};
