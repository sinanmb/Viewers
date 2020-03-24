import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

import LandmarkLocationShortcuts from '../connectedComponents/LandmarkLocationShortcuts';

const mockStore = configureStore([thunk]);
configure({ adapter: new Adapter() });

let store, wrapper;
const initialState = {
  landmark: {
    selectedLocation: 'Nerve',
    isToolSelected: true,
  },
};

describe('LandmarkLocationShortcuts component:', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(
      <Provider store={store}>
        <LandmarkLocationShortcuts />
      </Provider>
    );
  });

  test('matches the snapshot', () => {
    wrapper = shallow(
      <Provider store={store}>
        <LandmarkLocationShortcuts />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('it selects Nerve ', () => {
    var event = new KeyboardEvent('keypress', { key: '1' });
    document.dispatchEvent(event);

    expect(wrapper.props().selectedLocation == 'Nerve');
  });

  test('it selects Stenosis ', () => {
    var event = new KeyboardEvent('keypress', { key: '2' });
    document.dispatchEvent(event);

    expect(wrapper.props().selectedLocation == 'Stenosis');
  });
});
