import { configureStore } from "@reduxjs/toolkit";
import pharmaciesReducer from "../features/pharmacies/pharmaciesSlice";


export const store = configureStore({
  reducer: {
    pharmacies: pharmaciesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;