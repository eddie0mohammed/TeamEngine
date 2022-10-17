import React from "react";
import { Field, useFormikContext } from "formik";
import TextField from "./styled/TextField";
import SelectField from "./styled/SelectField";
import ErrorMessage from "./styled/ErrorMessage";
import { Box } from "../styled";

const FormField = ({
  name,
  placeholder,
  type,
  isSelectFieldType,
  defaultSelectOption,
  selectOptions,
}) => {
  const { errors, touched } = useFormikContext();
  return (
    <Box marginBottom="md">
      <Field name={name}>
        {({ field, meta }) =>
          isSelectFieldType ? (
            <SelectField
              data-cy={`${name}Input`}
              fontSize="lg"
              placeholder={placeholder}
              fluid
              error={meta.error && meta.touched}
              {...field}
            >
              <option value="" hidden>
                {defaultSelectOption}
              </option>
              {selectOptions.map(option => (
                <option key={option.name} value={option.value}>
                  {option.name}
                </option>
              ))}
            </SelectField>
          ) : (
            <TextField
              data-cy={`${name}Input`}
              fontSize="lg"
              placeholder={placeholder}
              fluid
              error={meta.error && meta.touched}
              {...field}
              type={type || "text"}
            />
          )
        }
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
