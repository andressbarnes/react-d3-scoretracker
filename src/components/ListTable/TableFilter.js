import React, { useState } from 'react';
import { Form, Popup } from 'semantic-ui-react';
const regex = new RegExp('^[a-zA-Z0-9 ]+$');

export const TableFilter = props => {
  const [filterState, setFilterState] = useState({
    filter: '',
    filterValid: true
  });

  const handleOnChange = (event, { name, value }) => {
    if (value !== '' && !regex.test(value)) {
      setFilterState({ [name]: value, filterValid: false });
    } else {
      setFilterState({ [name]: value, filterValid: true });
      props.onSubmitFilter(value);
    }
  };

  const { filter } = filterState;
  let popupMessage = '';
  if (!filterState.filterValid) {
    popupMessage = 'Invalid character.';
  } else if (props.totalCount === 0) {
    popupMessage = 'No results found.';
  }

  return (
    <Form>
      <Form.Group>
        <Form.Field>
          <Popup
            trigger={
              <Form.Input
                placeholder="Search filter"
                name="filter"
                value={filter}
                error={!filterState.filterValid}
                onChange={handleOnChange}
                icon="search"
                loading={props.loading}
                autoComplete="off"
              />
            }
            content={popupMessage}
            on="click"
            open={!filterState.filterValid || props.totalCount === 0}
            position="right center"
          />
        </Form.Field>
      </Form.Group>
    </Form>
  );
};
