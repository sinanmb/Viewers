import {
  GET_WORKING_LISTS,
  SELECT_WORKING_LIST,
  GET_WORKING_LIST_STUDIES,
  SET_STUDY_INDEX,
  SELECT_STUDY,
  UPDATE_WORKING_LIST_STUDY,
  SET_DISABLE_VIEWER,
} from './types';

import api from '../utils/api';

export const getWorkingLists = () => dispatch =>
  api.get('/working-lists').then(response =>
    dispatch({
      type: GET_WORKING_LISTS,
      payload: response.data,
    })
  );

export const selectWorkingList = workingList => dispatch =>
  dispatch({
    type: SELECT_WORKING_LIST,
    payload: workingList,
  });

export const getWorkingListStudies = workingList => dispatch =>
  api.get(`/working-lists/${workingList}/studies`).then(response =>
    dispatch({
      type: GET_WORKING_LIST_STUDIES,
      payload: response.data,
    })
  );

export const setStudyIndex = newIndex => dispatch =>
  dispatch({
    type: SET_STUDY_INDEX,
    payload: newIndex,
  });

export const selectStudy = study => dispatch =>
  dispatch({ type: SELECT_STUDY, payload: study });

export const updateWorkingListStudy = (
  workingListId,
  studyInstanceUID,
  status,
  locked_by,
  user_google_id
) => dispatch => {
  return api
    .put(`/working-lists/${workingListId}/studies/${studyInstanceUID}`, {
      status,
      locked_by,
      user_google_id,
    })
    .then(response =>
      dispatch({ type: UPDATE_WORKING_LIST_STUDY, payload: response.data })
    );
};

export const setDisableViewer = isDisabled => dispatch =>
  dispatch({ type: SET_DISABLE_VIEWER, payload: isDisabled });
