import {
  GET_WORKING_LISTS,
  SELECT_WORKING_LIST,
  GET_WORKING_LIST_STUDIES,
  SET_STUDY_INDEX,
  SELECT_STUDY,
  UPDATE_WORKING_LIST_STUDY,
  SET_DISABLE_VIEWER,
} from '../actions/types';

const initialState = {
  workingLists: [],
  selectedWorkingList: null,
  selectedWorkingListStudies: [],
  selectedStudy: null,
  isViewerDisabled: false,
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
    case UPDATE_WORKING_LIST_STUDY: {
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
    case SET_DISABLE_VIEWER:
      return {
        ...state,
        isViewerDisabled: action.payload,
      };

    default:
      return state;
  }
}
