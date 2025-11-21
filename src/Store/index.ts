import { configureStore } from "@reduxjs/toolkit";
import book from "./bookingSlice";

export const store = configureStore({
    reducer: {
        book: book
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch