export const SELECTED_SONG = "SELECTED_SONG";

export const selezionaCanzone = (i) => {
  return {
    type: SELECTED_SONG,
    payload: i,
  };
};
