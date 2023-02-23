import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import frame from "./frame/slice";
export const store = configureStore({
  reducer: { frame },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
