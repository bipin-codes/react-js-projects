import React from "react";
import "./form-input.styles.jsx";
import { FormLabel, Group, Input } from "./form-input.styles.jsx";
const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps}></Input>
      {label && <FormLabel shrink={otherProps.value.length}>{label}</FormLabel>}
    </Group>
  );
};
export default FormInput;
