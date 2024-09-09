import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./user/userApi";
import { catsApi } from "./cats/catsApi";
import { likesApi } from "./likes/likesApi";



export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [catsApi.reducerPath]: catsApi.reducer,
    [likesApi.reducerPath]: likesApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
        userApi.middleware,
        catsApi.middleware,
        likesApi.middleware
    ])
})


export type RootState = ReturnType<typeof store.getState>

