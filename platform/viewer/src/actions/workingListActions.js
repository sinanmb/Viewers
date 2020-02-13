import {
  GET_WORKING_LISTS,
  SELECT_WORKING_LIST,
  GET_WORKING_LIST_STUDIES,
  SET_STUDY_INDEX,
} from './types';
import axios from 'axios';

export const getWorkingLists = () => dispatch => {
  const workingListsEndpoint = 'https://api.myjson.com/bins/wom5g';

  axios.get(workingListsEndpoint).then(response =>
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

  const dummy = '1.2.826.0.13854362241694438965858641723883466450351448';
  const bellona = '1.3.6.1.4.1.25403.345050719074.3824.20170126085406.1';
  const MISTERMR = '1.2.840.113619.2.5.1762583153.215519.978957063.78';
  const studyIds = [dummy, bellona, MISTERMR];

  dispatch({
    type: GET_WORKING_LIST_STUDIES,
    payload: studyIds,
  });
};

export const setStudyIndex = newIndex => dispatch =>
  dispatch({
    type: SET_STUDY_INDEX,
    payload: newIndex,
  });
