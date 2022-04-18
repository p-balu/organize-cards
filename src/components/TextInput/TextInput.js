import React from "react";
import PropTypes from "prop-types";
import "../TextInput/TextInput.css";
const TextInput = ({
  name,
  type,
  placeholder,
  onChange,
  value,
  children,
  label,
  className,
  style,
  ...props
}) => {
  console.log(typeof onChange);

  return (
    <React.Fragment>
      <div className="form-field">
        <label htmlFor={label} id={label} className="label">
          {label}
        </label>
        <input
          type={type}
          className={className}
          placeholder={placeholder}
          id={name}
          name={name}
          value={value}
          style={style}
          onChange={onChange}
        />
      </div>
    </React.Fragment>
  );
};

TextInput.defaultProps = {
  type: "text",
  className: "text-input",
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  style: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};
export default TextInput;
