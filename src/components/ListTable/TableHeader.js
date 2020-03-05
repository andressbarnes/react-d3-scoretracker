import { Table } from 'semantic-ui-react';
import React from 'react';

export function TableHeader(props) {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell
          width={1}
          sorted={props.column === 'id' ? props.direction : null}
          onClick={() => props.handleSort('id')}
        >
          #
        </Table.HeaderCell>
        <Table.HeaderCell
          width={3}
          sorted={props.column === 'fName' ? props.direction : null}
          onClick={() => props.handleSort('fName')}
        >
          First Name
        </Table.HeaderCell>
        <Table.HeaderCell
          width={3}
          sorted={props.column === 'lName' ? props.direction : null}
          onClick={() => props.handleSort('lName')}
        >
          Last Name
        </Table.HeaderCell>
        <Table.HeaderCell
          width={1}
          sorted={props.column === 'scores.score1' ? props.direction : null}
          onClick={() => props.handleSort('scores.score1')}
        >
          Score 1
        </Table.HeaderCell>
        <Table.HeaderCell
          width={1}
          sorted={props.column === 'scores.score2' ? props.direction : null}
          onClick={() => props.handleSort('scores.score2')}
        >
          Score 2
        </Table.HeaderCell>
        <Table.HeaderCell
          width={1}
          sorted={props.column === 'scores.score3' ? props.direction : null}
          onClick={() => props.handleSort('scores.score3')}
        >
          Score 3
        </Table.HeaderCell>
        <Table.HeaderCell
          width={1}
          sorted={props.column === 'scores.score4' ? props.direction : null}
          onClick={() => props.handleSort('scores.score4')}
        >
          Score 4
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
}
