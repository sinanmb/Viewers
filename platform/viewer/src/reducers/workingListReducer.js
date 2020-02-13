import {
  GET_WORKING_LISTS,
  SELECT_WORKING_LIST,
  GET_WORKING_LIST_STUDIES,
  SET_STUDY_INDEX,
} from '../actions/types';

const initialState = {
  workingLists: [],
  selectedWorkingList: '',
  selectedWorkingListStudies: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WORKING_LISTS:
      return {
        ...state,
        workingLists: action.payload,
      };
    case SELECT_WORKING_LIST:
      return {
        ...state,
        selectedWorkingList: action.payload,
      };
    case GET_WORKING_LIST_STUDIES:
      return {
        ...state,
        selectedWorkingListStudies: action.payload,
      };
    case SET_STUDY_INDEX:
      return {
        ...state,
        studyIndex: action.payload,
      };
    default:
      return state;
  }
}
