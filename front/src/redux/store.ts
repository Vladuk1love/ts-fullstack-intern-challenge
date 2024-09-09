import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./user/userApi";
import { catsApi } from "./cats/catsApi";



export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [catsApi.reducerPath]: catsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
        userApi.middleware,
        catsApi.middleware
    ])
})


export type RootState = ReturnType<typeof store.getState>

