import { configureStore } from "@reduxjs/toolkit";
import authSlice from "modules/Authentication/slices/authSlice";
import seatSlice from "modules/Ticket/slices/seatSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    seat: seatSlice
  },
});

export default store;
