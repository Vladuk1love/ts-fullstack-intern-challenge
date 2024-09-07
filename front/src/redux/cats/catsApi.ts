import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICat } from "../../interfaces/cats.interface";

export const catsApi = createApi({
  reducerPath: "api/cats",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.thecatapi.com/v1/images",
  }),
  endpoints: (build) => ({
    getCats: build.query<ICat, any>({
      query: () => ({
        url: "/search?limit=10",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetCatsQuery } = catsApi
