import {
  GET_WORKING_LISTS,
  SELECT_WORKING_LIST,
  GET_WORKING_LIST_STUDIES,
  SET_STUDY_INDEX,
  SELECT_STUDY,
} from './types';

import api from '../utils/api';

export const getWorkingLists = () => dispatch => {
  api.get('/workinglists').then(response =>
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
  // TODO: Create fake endpoint for now
  // const studiesForWorkingListEndpoint = '';

  // axios.get(studiesForWorkingListEndpoint).then(response =>
  //   dispatch({
  //     type: GET_WORKING_LIST_STUDIES,
  //     payload: response.data,
  //   })
  // );

  const dummy = {
    studyInstanceUid: '1.2.826.0.13854362241694438965858641723883466450351448',
    name: "dummy's study",
  };
  const bellona = {
    studyInstanceUid: '1.3.6.1.4.1.25403.345050719074.3824.20170126085406.1',
    name: "bellona's study",
  };
  const MISTERMR = {
    studyInstanceUid: '1.2.840.113619.2.5.1762583153.215519.978957063.78',
    name: "MISTERMR's study",
  };
  const studies = [dummy, bellona, MISTERMR];

  dispatch({
    type: GET_WORKING_LIST_STUDIES,
    payload: studies,
  });
};

export const setStudyIndex = newIndex => dispatch =>
  dispatch({
    type: SET_STUDY_INDEX,
    payload: newIndex,
  });

export const selectStudy = study => dispatch =>
  dispatch({ type: SELECT_STUDY, payload: study });
