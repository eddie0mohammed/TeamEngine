import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Header } from "../styled";
import { getEmployeesRecords } from "../../redux/employees/selectors";
import { removeEmployee } from "../../redux/employees";
import MyTable from "./MyTable";
import TextField from "../Create/styled/TextField";
import TopSection from "./styled/TopSection";
import TableContainer from "./styled/TableContainer";
import { DEBOUNCED_DELAY, ROUTES } from "../App/Constants";
import useDebounce from "../../hooks/useDebounce";

const View = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const employeesRecordsList = useSelector(getEmployeesRecords);

  const [displayedRecords, setDisplayedRecord] = useState(employeesRecordsList);

  const handleEditBtnClick = employeeId => {
    history.push(`${ROUTES.EDIT_PAGE}/${employeeId}`);
  };

  const handleDeleteBtnClick = employeeId => {
    dispatch(removeEmployee(employeeId));
  };

  const [searchInputValue, setSearchInputValue] = useState("");

  const debouncedSearchTerm = useDebounce(searchInputValue, DEBOUNCED_DELAY);

  useEffect(() => {
    function filterAndUpdateList() {
      const filteredRecords = employeesRecordsList.filter(records =>
        records.surname
          .toLowerCase()
          .startsWith(debouncedSearchTerm.toLowerCase())
      );
      setDisplayedRecord(filteredRecords);
    }

    filterAndUpdateList();
  }, [debouncedSearchTerm, employeesRecordsList]);

  return (
    <Box width="100vw" height="90vh">
      <Header data-cy="header">View Employees</Header>

      <TopSection>
        <Button data-cy="backButton" onClick={() => history.goBack()}>
          Back
        </Button>

        <TextField
          data-cy="searchInput"
          fontSize="lg"
          placeholder="Enter Employee's Surname ..."
          fluid
          value={searchInputValue}
          onChange={e => setSearchInputValue(e.target.value)}
        />
      </TopSection>

      <TableContainer>
        <MyTable
          displayedRecords={displayedRecords}
          handleEditBtnClick={handleEditBtnClick}
          handleDeleteBtnClick={handleDeleteBtnClick}
        />
      </TableContainer>
    </Box>
  );
};

export default View;
