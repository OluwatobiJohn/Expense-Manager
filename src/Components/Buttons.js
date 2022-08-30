import React from "react";
import { Button as ReactstrapButton } from "reactstrap";
import PropTypes from "prop-types";

const Button = ({
  tab = false,
  active,
  color = "primary",
  children,
  className,
  ...rest
}) => {
  if (tab) {
    return (
      <button
        className={`${
          active ? "tab-btns-active" : "tab-btns-inactive"
        } ${className || ""}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
  return (
    <ReactstrapButton color={color} className={className || ""} {...rest}>
      {children}
    </ReactstrapButton>
  );
};

Button.propTypes = {
  tab: PropTypes.bool,
  active: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
