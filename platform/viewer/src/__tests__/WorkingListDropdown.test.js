import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';

import WorkingListDropdown from '../connectedComponents/WorkingListDropdown';

const mockStore = configureStore([thunk]);
configure({ adapter: new Adapter() });

let store, wrapper;
const initialState = {
  workingLists: {
    workingLists: [
      {
        name: 'Study 1',
        study_instance_uid: 'study_instance_uid_1',
      },
      {
        name: 'Study 2',
        study_instance_uid: 'study_instance_uid_2',
      },
    ],
    studyIndex: 0,
  },
};

describe('WorkingListDropdown component:', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('matches the snapshot', () => {
    wrapper = shallow(
      <MemoryRouter>
        <Provider store={store}>
          <WorkingListDropdown />
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
