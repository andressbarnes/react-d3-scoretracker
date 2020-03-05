import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider, Segment, Grid } from 'semantic-ui-react';

//components
import { ListTable } from './Table.js';
import { TableFilter } from './TableFilter.js';

const queryParams = ['_limit', '_order', '_sort', 'q', '_page'];

const UserListTable = ({ dataRequest, data }) => {
  const [tableState, setTableState] = useState({
    users: [],
    _sort: 'id',
    _page: 1,
    _order: null,
    _limit: 10,
    q: '',
    totalCount: 0,
    loading: false,
    removeAll: false
  });

  const directionConverter = order => {
    if (order === 'asc') {
      return 'ascending';
    } else if (order === 'desc') {
      return 'descending';
    } else {
      return null;
    }
  };

  const handleSort = clickedColumn => {
    const { _sort, _order } = tableState;

    let newOrder = _order === 'asc' ? 'desc' : 'asc';
    if (_sort !== clickedColumn) {
      newOrder = 'asc';
    }

    loadData(
      {
        _sort: clickedColumn,
        _page: 1,
        _order: newOrder
      },
      false
    );
  };

  const onChangeLimit = (event, data) => {
    if (data.value !== tableState._limit) {
      loadData({ _limit: data.value, _page: 1 }, true);
    }
  };

  const onSubmitFilter = filter => {
    //add biffer here
    loadData({ q: filter, _page: 1, _limit: tableState._limit }, true);
  };

  const onChangePage = (event, data) => {
    const { activePage } = data;
    if (activePage !== tableState._page) {
      loadData({ _page: activePage, removeAll: false });
    }
  };
  const getTotalCount = async totalCountQuery => {
    try {
      return await axios.get(`http://localhost:4000/users?${totalCountQuery}`);
    } catch (error) {
      console.error('error');
    }
  };
  //useEffect(() => {}, [tableState]);

  const loadData = async (params, removeAll) => {
    const current = tableState;
    queryParams.forEach(element => {
      if (!(element in params)) {
        params[element] = current[element];
      }
    });

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');

    // Make a request without limit first to get the total number of data.
    let totalCountQuery = '';
    if (params.q !== '') {
      totalCountQuery = `q=${params.q}`;
    }

    const totalCount = await getTotalCount(totalCountQuery);
    if (totalCount) {
      dataRequest(query, removeAll);
      setTableState({
        ...tableState,
        _page: params._page,
        totalCount: totalCount.data.length,
        _limit: params._limit,
        _order: params._order,
        _sort: params._sort,
        loading: false,
        removeAll: removeAll
      });
    } else {
      console.log(`Failed to load data:`);
    }
  };

  useEffect(
    () => {
      loadData({}, false);
    }, // eslint-disable-next-line
    []
  );

  return (
    <Segment inverted color="grey">
      <Grid>
        <Grid.Column floated="left" width={5}>
          <TableFilter
            filter={tableState.q}
            totalCount={tableState.totalCount}
            onSubmitFilter={onSubmitFilter}
            loading={tableState.loading}
          />
        </Grid.Column>
        <Grid.Column floated="right" width={5}>
          <div className="addNewButton">
            {/* <Link to="./users/new" className="ui button primary">
              <Icon name="plus" />
              Add User
            </Link> */}
          </div>
        </Grid.Column>
      </Grid>

      <Divider />
      <ListTable
        users={data}
        totalCount={tableState.totalCount}
        totalPages={Math.ceil(tableState.totalCount / tableState._limit)}
        currentPage={tableState._page}
        onChangePage={onChangePage}
        column={tableState._sort}
        direction={directionConverter(tableState._order)}
        handleSort={handleSort}
        onChangeLimit={onChangeLimit}
        limit={tableState._limit.toString()}
        removeAll={tableState.removeAll}
      />
    </Segment>
  );
};

export default UserListTable;
