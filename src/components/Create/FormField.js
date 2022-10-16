import React from "react";
import { Field, useFormikContext } from "formik";
import TextField from "./styled/TextField";
import SelectField from "./styled/SelectField";
import ErrorMessage from "./styled/ErrorMessage";
import { STATUS } from "./Constants";
import { Box } from "../styled";

const FormField = ({ name, placeholder, type, isSelectFieldType }) => {
  const { errors, touched } = useFormikContext();
  return (
    <Box marginBottom="md">
      <Field name={name}>
        {({ field, meta }) => {
          if (isSelectFieldType) {
            return (
              <SelectField
                data-cy={`${name}Input`}
                fontSize="lg"
                placeholder={placeholder}
                fluid
                error={meta.error && meta.touched}
                {...field}
              >
                <option value="" hidden>
                  Status
                </option>
                {STATUS.map(status => (
                  <option key={status.name} value={status.value}>
                    {status.name}
                  </option>
                ))}
              </SelectField>
            );
          }

          return (
            <TextField
              data-cy={`${name}Input`}
              fontSize="lg"
              placeholder={placeholder}
              fluid
              error={meta.error && meta.touched}
              {...field}
              type={type || "text"}
            />
          );
        }}
      </Field>
      {errors[name] && touched[name] && (
        <ErrorMessage data-cy={`${name}ErrorMessage`}>
          {errors[name]}
        </ErrorMessage>
      )}
    </Box>
  );
};

export default FormField;
