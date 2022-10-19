import React from "react";
import { Button } from "../styled";
import Table from "../styled/CustomTable";

const MyTable = ({
  displayedRecords,
  handleEditBtnClick,
  handleDeleteBtnClick,
}) => (
  <Table>
    <Table.Head>
      <Table.TR>
        <Table.TH data-cy="firstName">First Name</Table.TH>
        <Table.TH data-cy="surname">Surname</Table.TH>
        <Table.TH width="20" data-cy="email">
          Email
        </Table.TH>
        <Table.TH data-cy="dob">DOB</Table.TH>
        <Table.TH data-cy="jobTitle">Job Title</Table.TH>
        <Table.TH data-cy="status">Status</Table.TH>
        <Table.TH> </Table.TH>
        <Table.TH> </Table.TH>
      </Table.TR>
    </Table.Head>

    <Table.Body>
      {displayedRecords?.map(
        ({ id, firstName, surname, email, birthDate, jobTitle, status }) => (
          <Table.TR key={`${id}-${firstName}`} data-cy="tr">
            <Table.TD data-cy="td-firstName">{firstName}</Table.TD>
            <Table.TD data-cy="td-surname">{surname}</Table.TD>
            <Table.TD data-cy="td-email">{email}</Table.TD>
            <Table.TD data-cy="td-birthDate">{birthDate}</Table.TD>
            <Table.TD data-cy="td-jobTitle">{jobTitle}</Table.TD>
            <Table.TD data-cy="td-status" boldFont>
              {status}
            </Table.TD>

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
);

export default MyTable;
