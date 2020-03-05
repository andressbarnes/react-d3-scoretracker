import React, { useState } from 'react';
import { Segment } from 'semantic-ui-react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

//components

import LineChart from './components/LineChart';
import UserListTable from './components/ListTable/UserListTable';

const App = () => {
  const [appData, setData] = useState({
    removeAll: false,
    data: null
  });

  const fetchData = (query, removeAll) => {
    axios.get(`http://localhost:4000/users/?&${query}`).then(res => {
      setData({ data: res.data, removeAll: removeAll });
    });
  };

  const removeAllLinesBeforeRendering = isRemoveAll => {
    setData({ ...appData, removeAll: isRemoveAll });
  };

  return (
    <div className="App">
      <Segment inverted color="grey">
        {!appData.data ? (
          <div>LOADING</div>
        ) : (
          <LineChart
            data={appData.data}
            removeAll={appData.removeAll}
            removeAllCallBack={removeAllLinesBeforeRendering}
          />
        )}
      </Segment>
      <Segment inverted color="grey">
        <UserListTable dataRequest={fetchData} data={appData.data} />
      </Segment>
    </div>
  );
};

export default App;
