import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchData } from "./asyncAction";
import { Status, InitialState, Option } from "./types";

const initialState: InitialState = {
  frame: {
    header: {
      left: [],
      right: [],
    },
    modal: [],
    slider: [],
  },
  modification: {
    header: { position: "center" },
    slider: [],
  },
  status: Status.LOADING,
};

const FrameSlice = createSlice({
  name: "frame",
  initialState,
  reducers: {
    setModification(
      state,
      action: PayloadAction<{
        type: string;
        modification:
          | { [key: string]: string | null }
          | { [key: string]: string | null }[];
      }>
    ) {
      state.modification = {
        ...state.modification,
        [action.payload.type]: action.payload.modification,
      };
    },
    showModal(state, action: PayloadAction<string>) {
      const indexModal = state.frame.modal.findIndex(
        (obj) => obj.ID === action.payload
      );
      if (indexModal !== -1) state.frame.modal[indexModal].state = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.frame = action.payload.frame;
      state.modification = action.payload.modification;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = Status.ERROR;
    });
  },
});

export const { showModal, setModification } = FrameSlice.actions;

export default FrameSlice.reducer;
