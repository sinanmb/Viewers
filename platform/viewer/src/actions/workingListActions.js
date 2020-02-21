import {
  GET_WORKING_LISTS,
  SELECT_WORKING_LIST,
  GET_WORKING_LIST_STUDIES,
  SET_STUDY_INDEX,
  SELECT_STUDY,
  SET_REVIEW_STATUS,
} from './types';

import api from '../utils/api';

export const getWorkingLists = () => dispatch => {
  api.get('/working-lists').then(response =>
    dispatch({
      type: GET_WORKING_LISTS,
      payload: response.data,
    })
  );
};

export const selectWorkingList = workingList => dispatch =>
  dispatch({
    type: SELECT_WORKING_LIST,
    payload: workingList,
  });

export const getWorkingListStudies = workingList => dispatch => {
  api.get(`/working-lists/${workingList}/studies`).then(response =>
    dispatch({
      type: GET_WORKING_LIST_STUDIES,
      payload: response.data,
    })
  );
};

export const setStudyIndex = newIndex => dispatch =>
  dispatch({
    type: SET_STUDY_INDEX,
    payload: newIndex,
  });

export const selectStudy = study => dispatch =>
  dispatch({ type: SELECT_STUDY, payload: study });

export const setReviewStatus = (
  workingListId,
  studyInstanceUid,
  status
) => dispatch => {
  api
    .put(`/working-lists/${workingListId}/studies/${studyInstanceUid}`, {
      status,
    })
    .then(response =>
      dispatch({ type: SET_REVIEW_STATUS, payload: response.data })
    );
};
