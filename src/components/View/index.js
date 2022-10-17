/* eslint-disable no-unused-vars */
import React, { useRef, useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Header } from "../styled";
import { getEmployeesRecords } from "../../redux/employees/selectors";
import { removeEmployee } from "../../redux/employees";
import Table from "./myTable";
import TextField from "../Create/styled/TextField";
import TopSection from "./styled/topSection";
import TableContainer from "./styled/tableContainer";
import { ROUTES } from "../App/Constants";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const View = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const tableRef = useRef();
  const employeesRecordsList = useSelector(getEmployeesRecords);

  const handleEditBtnClick = employeeId => {
    history.push(`${ROUTES.EDIT_PAGE}/${employeeId}`);
  };

  const handleDeleteBtnClick = employeeId => {
    dispatch(removeEmployee(employeeId));
  };

  // const onScrollBottom = useCallback(() => {
  //   if (hasMorePages && loadingStatus !== LOADER_STATUS.IN_PROGRESS) {
  //     dispatch(loadMoreBetHistory({ lastTimestamp, lastRunning }));
  //   }
  // }, [dispatch, loadingStatus, lastTimestamp, hasMorePages, lastRunning]);
  // const onScrollBottom = useCallback(() => {
  //   console.log("done");
  // }, []);

  // useInfiniteScroll(tableRef.current, onScrollBottom);

  // console.log(tableRef);

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
          placeholder="Enter Employee Name ..."
          fluid
        />
      </TopSection>

      <TableContainer ref={tableRef}>
        <Table>
          <Table.Head>
            <Table.TR>
              <Table.TH>First Name</Table.TH>
              <Table.TH>Surame</Table.TH>
              <Table.TH>Email</Table.TH>
              <Table.TH>DOB</Table.TH>
              <Table.TH>Job Title</Table.TH>
              <Table.TH>Status</Table.TH>
              <Table.TH> </Table.TH>
              <Table.TH> </Table.TH>
            </Table.TR>
          </Table.Head>

          <Table.Body>
            {employeesRecordsList
              ?.slice(0, 15)
              ?.map(
                ({
                  id,
                  firstName,
                  surname,
                  email,
                  birthDate,
                  jobTitle,
                  status,
                }) => (
                  <Table.TR key={`${id}-${firstName}`}>
                    <Table.TD>{firstName}</Table.TD>
                    <Table.TD>{surname}</Table.TD>
                    <Table.TD>{email}</Table.TD>
                    <Table.TD>{birthDate}</Table.TD>
                    <Table.TD>{jobTitle}</Table.TD>
                    <Table.TD boldFont>{status}</Table.TD>

                    <Table.TD>
                      <Button
                        data-cy="editButton"
                        backgroundColor="warning"
                        onClick={() => handleEditBtnClick(id)}
                      >
                        Edit
                      </Button>
                    </Table.TD>
                    <Table.TD>
                      <Button
                        data-cy="deleteButton"
                        backgroundColor="danger"
                        onClick={() => handleDeleteBtnClick(id)}
                      >
                        Delete
                      </Button>
                    </Table.TD>
                  </Table.TR>
                )
              )}
          </Table.Body>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default View;
