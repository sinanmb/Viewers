import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';

import NextStudyButton from '../connectedComponents/NextStudyButton';

const mockStore = configureStore([thunk]);
configure({ adapter: new Adapter() });

let store, wrapper;
const initialState = {
  workingLists: {
    selectedWorkingListStudies: [
      {
        status: false,
        study_id: 'study_id_1',
        study_instance_uid: 'study_instance_uid_1',
      },
      {
        status: false,
        study_id: 'study_id_2',
        study_instance_uid: 'study_instance_uid_2',
      },
    ],
    studyIndex: 0,
  },
};

describe('NextStudyButton component:', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('matches the snapshot', () => {
    wrapper = shallow(
      <MemoryRouter>
        <Provider store={store}>
          <NextStudyButton />
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('it passes workingLists from the state', () => {
    wrapper = shallow(
      <MemoryRouter>
        <Provider store={store}>
          <NextStudyButton />
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.props().studyIndex).toBe(initialState.studyIndex);
    expect(wrapper.props().selectedWorkingListStudies).toBe(
      initialState.selectedWorkingListStudies
    );
  });

  test('it navigates to the next study url', async () => {
    const history = createMemoryHistory();
    wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <NextStudyButton />
        </Provider>
      </Router>
    );

    await wrapper.find('button').simulate('click');

    const next_study_url = '/viewer/study_instance_uid_2';
    expect(history.location.pathname).toBe(next_study_url);
  });
});
