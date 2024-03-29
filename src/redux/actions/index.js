export const SELECTED_SONG = "SELECTED_SONG";

export const selezionaCanzone = (props) => {
  return {
    type: SELECTED_SONG,
    payload: props,
  };
};
