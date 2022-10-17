import React, { useCallback, useState } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Header } from "../styled";
import FormField from "./FormField";
import FormButtons from "./FormButtons";
import formValidationSchema from "./formValidationSchema";
import {
  saveNewEmployee,
  editEmployee,
} from "../../redux/employees/actionCreators";
import { getEmployeesRecords } from "../../redux/employees/selectors";
import { ROUTES, STATUS } from "../App/Constants";

const Create = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const employeesRecordsList = useSelector(getEmployeesRecords);

  const defaultInitialValues = {
    firstName: "",
    surname: "",
    email: "",
    jobTitle: "",
    birthDate: "",
    status: "",
  };

  const [isEditMode] = useState(() => {
    return !!match?.params?.employeeId;
  });

  const [initialValues] = useState(() => {
    if (match?.params?.employeeId) {
      const employeeDetails = employeesRecordsList?.find(
        employee => employee.id.toString() === match.params.employeeId
      );
      if (employeeDetails) {
        return employeeDetails;
      }
    }
    return defaultInitialValues;
  });

  const submitForm = useCallback(
    employee => {
      if (isEditMode) {
        dispatch(editEmployee(employee));
      } else {
        dispatch(saveNewEmployee(employee));
      }
      // navigate to homepage upon create/edit successful
      history.push(ROUTES.HOME_PAGE);
    },
    [dispatch, history, isEditMode]
  );

  return (
    <>
      <Header>{isEditMode ? "Edit" : "Create new"} employee</Header>
      <Formik
        validationSchema={formValidationSchema}
        onSubmit={submitForm}
        initialValues={initialValues}
      >
        <Flex alignItems="center" justifyContent="center" height="100%">
          <Flex alignItems="left" direction="column" width="300px">
            <FormField name="firstName" placeholder="First name" />
            <FormField name="surname" placeholder="Surname" />
            <FormField name="email" placeholder="Email" />
            <FormField name="birthDate" type="date" />
            <FormField name="jobTitle" placeholder="Job Title" />
            <FormField
              name="status"
              isSelectFieldType
              defaultSelectOption="Status"
              selectOptions={STATUS}
            />
            <FormButtons />
          </Flex>
        </Flex>
      </Formik>
    </>
  );
};

export default Create;
