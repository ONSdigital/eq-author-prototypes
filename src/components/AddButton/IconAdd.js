import React from "react";
import PropTypes from "prop-types";

const IconAdd = props => (
  <span {...props}>
    <svg width="8px" height="8px" viewBox="3 4 8 8" version="1.1">
      <path
        d="M7.50043066,7.44482759 L7.50043066,4.70517241 C7.50043066,4.42758621 7.2833764,4.21034483 7.00602929,4.21034483 C6.72868217,4.21034483 6.51162791,4.42758621 6.51162791,4.70517241 L6.51162791,7.43275862 L3.78639104,7.43275862 C3.50904393,7.43275862 3.29198966,7.65 3.29198966,7.92758621 C3.29198966,8.20517241 3.50904393,8.42241379 3.78639104,8.42241379 L6.51162791,8.42241379 L6.51162791,11.15 C6.51162791,11.4275862 6.72868217,11.6448276 7.00602929,11.6448276 C7.2833764,11.6448276 7.50043066,11.4275862 7.50043066,11.15 L7.50043066,8.42241379 L10.2256675,8.42241379 C10.5030146,8.42241379 10.7200689,8.20517241 10.7200689,7.92758621 C10.7200689,7.65 10.5030146,7.44482759 10.2256675,7.44482759 L7.50043066,7.44482759 Z"
        id="add"
        stroke="none"
        fill={props.fill || "#eaeaea"}
        fillRule="evenodd"
      />
    </svg>
  </span>
);

IconAdd.defaultProps = {
  fill: "#eaeaea"
};

IconAdd.propTypes = {
  fill: PropTypes.string
};

export default IconAdd;
