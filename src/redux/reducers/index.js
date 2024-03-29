import { SELECTED_SONG } from "../actions";

const initialState = {
  selezionato: {},
};

const mainReducer = function (state = initialState, action) {
  switch (action.type) {
    case SELECTED_SONG:
      return {
        ...state,
        selezionato: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
