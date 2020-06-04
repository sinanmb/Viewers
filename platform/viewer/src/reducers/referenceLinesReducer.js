import { TOGGLE_REFERENCE_LINES_DISPLAY } from '../actions/types';

const initialState = { isEnabled: true };

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_REFERENCE_LINES_DISPLAY:
      return {
        ...state,
        isEnabled: !state.isEnabled,
      };
    default:
      return state;
  }
}
