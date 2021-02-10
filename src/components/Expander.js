import React from "react";
import colors from "../constants/colors";
import {Icon} from "material-bread";

export const Expander = (props) => {
  const {expanded, style} = props;
  return (
    <Icon
      size={24}
      name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
      color={colors.faded}
      style={style}
    />
  );
};
