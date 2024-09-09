import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICat } from "../../interfaces/cats.interface";
import { setAuthHeader } from "../../utils/setHeaders";

export const catsApi = createApi({
  reducerPath: "api/cats",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/api/cats",
    prepareHeaders: setAuthHeader,
  }),
  endpoints: (build) => ({
    getCats: build.query<ICat[], any>({
      query: () => ({
        url: "",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetCatsQuery } = catsApi
