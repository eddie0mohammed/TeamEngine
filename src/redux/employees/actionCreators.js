import * as actions from ".";

export const saveNewEmployee = employee => dispatch => {
  dispatch(actions.saveNewEmployee(employee));
};

export const editEmployee = employee => dispatch => {
  dispatch(actions.editEmployee(employee));
};

export const removeEmployee = employeeId => dispatch => {
  dispatch(actions.removeEmployee(employeeId));
};
