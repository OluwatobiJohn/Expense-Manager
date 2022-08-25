import { Field } from "formik";
import React, { useState } from "react";
import { FormGroup, Input } from "reactstrap";
import PropTypes from "prop-types";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const PasswordInput = ({ children, label, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div>
      <FormGroup>
        <label>{label}</label>
        <div className="password-wrapper">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            className="login-password"
            value={value}
            onChange={onChange}
          />
          {showPassword ? (
            <VisibilityIcon
              style={{ color: "black" }}
              onClick={() => setShowPassword(false)}
              className="show-hide-password"
            />
          ) : (
            <VisibilityOffIcon
              style={{ color: "black" }}
              onClick={() => setShowPassword(true)}
              className="show-hide-password"
            />
          )}
        </div>
      </FormGroup>
      {children}
    </div>
  );
};

PasswordInput.propTypes = {
  children: PropTypes.any,
  label: PropTypes.any,
};

export default PasswordInput;
