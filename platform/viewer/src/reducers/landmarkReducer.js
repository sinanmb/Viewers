import {
  SELECT_LOCATION,
  SET_LANDMARK_TOOL_SELECTION_STATUS,
} from '../actions/types';

const initialState = {
  selectedLocation: 'Nerve',
  isToolSelected: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload,
      };
    case SET_LANDMARK_TOOL_SELECTION_STATUS:
      return {
        ...state,
        isToolSelected: action.payload,
      };
    default:
      return state;
  }
}
