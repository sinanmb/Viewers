import {
  GET_WORKING_LISTS,
  SELECT_WORKING_LIST,
  GET_WORKING_LIST_STUDIES,
  SET_STUDY_INDEX,
  SELECT_STUDY,
  SET_REVIEW_STATUS,
} from '../actions/types';

const initialState = {
  workingLists: [],
  selectedWorkingList: null,
  selectedWorkingListStudies: [],
  selectedStudy: null,
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
        selectedWorkingListStudies: action.payload, // List of studies for the selected working list
      };
    case SET_STUDY_INDEX:
      return {
        ...state,
        studyIndex: action.payload,
      };
    case SELECT_STUDY:
      return {
        ...state,
        selectedStudy: action.payload,
      };
    case SET_REVIEW_STATUS: {
      const selectedStudy = action.payload;
      const selectedWorkingListStudies = state.selectedWorkingListStudies;
      selectedWorkingListStudies.find(
        study => study.study_instance_uid == selectedStudy.study_instance_uid
      ).status = selectedStudy.status;

      return {
        ...state,
        selectedStudy,
        selectedWorkingListStudies,
      };
    }

    default:
      return state;
  }
}
