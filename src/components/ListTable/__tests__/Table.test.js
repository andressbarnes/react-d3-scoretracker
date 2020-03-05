import React from 'react';
import { shallow } from 'enzyme';
import { ListTable } from '../Table';

describe('Table', () => {
  it('should render correctly', () => {
    const users = [
      {
        id: 1,
        fname: 'Andy',
        lname: 'Barnes',
        company: 1
      },
      {
        id: 2,
        fname: 'Jane',
        lname: 'Doe',
        company: 3
      },
      {
        id: 3,
        fname: 'John',
        lname: 'Doe',
        company: 4
      }
    ];

    shallow(
      <ListTable
        users={users}
        totalCount={100}
        totalPages={10}
        currentPage={0}
        deleteUser={() => {}}
        onChangePage={() => {}}
        onChangeLimit={() => {}}
        limit={'10'}
        column={0}
        direction={0}
        handleSort={() => {}}
      />
    );
  });

  it('Empty props.users', () => {
    shallow(
      <ListTable
        totalCount={100}
        totalPages={10}
        currentPage={0}
        deleteUser={() => {}}
        onChangePage={() => {}}
        addFavorite={() => {}}
        onChangeLimit={() => {}}
        limit={'10'}
      />
    );
  });
});
