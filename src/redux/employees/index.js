import { createSlice } from "@reduxjs/toolkit";
import EMPLOYEE_MOCK_DATA from "./EMPLOYEE_MOCK_DATA";

const initialState = {
  employees_records: EMPLOYEE_MOCK_DATA,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    saveNewEmployee: {
      prepare: employee => ({
        payload: { ...employee, id: new Date().getTime() },
      }),
      reducer(draftState, action) {
        draftState.employees_records = [
          ...draftState.employees_records,
          action.payload,
        ];
      },
    },

    editEmployee: {
      prepare: employee => ({
        payload: { ...employee },
      }),
      reducer(draftState, action) {
        const recordIndex = draftState.employees_records.findIndex(
          record => record.id === action.payload.id
        );
        const employeesRecords = [...draftState.employees_records];
        employeesRecords[recordIndex] = action.payload;
        draftState.employees_records = employeesRecords;
      },
    },

    removeEmployee: {
      prepare: employeeId => ({
        payload: employeeId,
      }),
      reducer(draftState, action) {
        const updatedEmployeesRecords = draftState.employees_records.filter(
          record => record.id !== action.payload
        );
        draftState.employees_records = updatedEmployeesRecords;
      },
    },
  },
});

export const { saveNewEmployee, editEmployee, removeEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
