import { RootState } from "../store";

export const getFrame = (state: RootState) => state.frame.frame;
export const getHeader = (state: RootState) => state.frame.frame.header;
export const getModification = (state: RootState) => state.frame.modification;

export const getSlider = (ID: string) => (state: RootState) => {
  return {
    slider: state.frame.frame.slider.find((obj) => obj.ID === ID),
    modification: state.frame.modification.slider.find((obj) => obj.ID === ID),
  };
};

export const getModificationHeader = (state: RootState) =>
  state.frame.modification.header;
