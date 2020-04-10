import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';

// TODO Sinan: fix test
// import PreviousStudyButton from '../connectedComponents/PreviousStudyButton';

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
    studyIndex: 1,
  },
};

describe.skip('PreviousStudyButton component:', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('matches the snapshot', () => {
    wrapper = shallow(
      <MemoryRouter>
        <Provider store={store}>
          <PreviousStudyButton />
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('it passes workingLists from the state', () => {
    wrapper = shallow(
      <MemoryRouter>
        <Provider store={store}>
          <PreviousStudyButton />
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.props().studyIndex).toBe(initialState.studyIndex);
    expect(wrapper.props().selectedWorkingListStudies).toBe(
      initialState.selectedWorkingListStudies
    );
  });

  test('it navigates to the previous study url', async () => {
    const history = createMemoryHistory();
    wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <PreviousStudyButton />
        </Provider>
      </Router>
    );

    await wrapper.find('button').simulate('click');

    const previous_study_url = '/viewer/study_instance_uid_1';
    expect(history.location.pathname).toBe(previous_study_url);
  });
});
