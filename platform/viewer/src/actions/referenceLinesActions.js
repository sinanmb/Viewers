import { TOGGLE_REFERENCE_LINES_DISPLAY } from './types';

export const toggleRerefenceLinesDisplay = _ => dispatch =>
  dispatch({
    type: TOGGLE_REFERENCE_LINES_DISPLAY,
  });
