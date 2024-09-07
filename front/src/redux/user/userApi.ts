import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../interfaces/user.interface";
import { setAuthHeader } from "../../utils/setHeaders";

export const userApi = createApi({
  reducerPath: "api/user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/api/users",
    prepareHeaders: setAuthHeader,
  }),
  endpoints: (build) => ({
    loginUser: build.mutation<{ accessToken: string }, Omit<IUser, "name">>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    registerUser: build.mutation<{ accessToken: string }, IUser>({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMe: build.query<Omit<IUser, "password">, any>({
      query: () => ({
        url: "/getMe",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useLoginUserMutation } = userApi;
export const { useRegisterUserMutation } = userApi;
export const { useGetMeQuery } = userApi;
