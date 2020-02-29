import { SELECT_LOCATION, SET_LANDMARK_TOOL_SELECTION_STATUS } from './types';

export const selectLocation = location => dispatch =>
  dispatch({
    type: SELECT_LOCATION,
    payload: location,
  });

export const setLandmarkToolSelectionStatus = status => dispatch =>
  dispatch({
    type: SET_LANDMARK_TOOL_SELECTION_STATUS,
    payload: status,
  });
