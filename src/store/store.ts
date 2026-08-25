import { configureStore } from "@reduxjs/toolkit";
import showsReducer from "./showsSlice"


export const store = configureStore({
    reducer: {
        shows: showsReducer
    }
})

// Derived from the store itself so these types always match its real shape —
// used to type useSelector/useDispatch in components instead of the untyped defaults.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch