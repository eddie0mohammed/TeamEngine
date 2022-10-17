import React from "react";
import { useHistory } from "react-router";
import { ROUTES } from "../App/Constants";
import { Button, Box, Flex, Header } from "../styled";

const Overview = () => {
  const history = useHistory();

  return (
    <>
      <Header data-cy="header">My Employees</Header>
      <Flex
        height="80%"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box marginBottom="lg">
          <Button
            data-cy="newEmployeeButton"
            onClick={() => history.push(ROUTES.CREATE_PAGE)}
          >
            Add new employees
          </Button>
        </Box>
        <Box>
          <Button
            data-cy="viewEmployeesButton"
            onClick={() => history.push(ROUTES.VIEW_PAGE)}
          >
            View all employees
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Overview;
