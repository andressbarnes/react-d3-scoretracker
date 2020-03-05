import React from 'react';
//import { Link } from 'react-router-dom';
import { Table, Icon } from 'semantic-ui-react';

const handleClick = e => {
  if (e.target.parentElement.classList.contains('row-selected')) {
    e.target.parentElement.classList.remove('row-selected');
  } else {
    e.target.parentElement.classList.add('row-selected');
  }
};

export const TableRow = props => (
  <Table.Row className={`row${props.users.id}`} onClick={handleClick}>
    <Table.Cell>{props.users.id}</Table.Cell>
    <Table.Cell>
      {/* <Link to={`./users/edit/${props.users.id}`}> */}
      <Icon name="circle" style={{ color: props.users.color }} size="small" />
      {props.users.fName}
      {/* </Link> */}
    </Table.Cell>
    <Table.Cell>{props.users.lName}</Table.Cell>
    <Table.Cell>{props.users.scores.score1}</Table.Cell>
    <Table.Cell>{props.users.scores.score2}</Table.Cell>
    <Table.Cell>{props.users.scores.score3}</Table.Cell>
    <Table.Cell>{props.users.scores.score4}</Table.Cell>
  </Table.Row>
);
