import React from 'react';
import { Table, Pagination } from 'semantic-ui-react';
import { TableSizeSelector } from './TableSizeSelector.js';
import { TableRow } from './TableRow.js';
import { TableHeader } from './TableHeader.js';

export const ListTable = props => {
  if (!props.users || props.users.length === 0) {
    return <>LOADING</>;
  }
  //convert to array to get table rows
  const usersArray = Object.values(props.users);

  const TableRows = usersArray.map((users, index) => (
    <TableRow
      key={index}
      users={users}
      editUser={props.editUser}
      deleteUser={props.deleteUser}
    />
  ));
  return (
    <React.Fragment>
      <TableSizeSelector
        limit={props.limit}
        onChangeLimit={props.onChangeLimit}
      />
      Total count: {props.totalCount}.
      <Table compact celled selectable sortable inverted>
        <TableHeader
          column={props.column}
          direction={props.direction}
          handleSort={props.handleSort}
        />

        <Table.Body>{TableRows}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="8">
              <Pagination
                inverted
                totalPages={props.totalPages}
                activePage={props.currentPage}
                onPageChange={props.onChangePage}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </React.Fragment>
  );
};
