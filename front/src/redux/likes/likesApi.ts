import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthHeader } from "../../utils/setHeaders";
import { ILike } from "../../interfaces/like.interface";

export const likesApi = createApi({
  reducerPath: "api/likes",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/api/cats/likes",
    prepareHeaders: setAuthHeader,
  }),
  endpoints: (build) => ({
    getOnlyLikedCats: build.query<ILike[], any>({
      query: () => ({
        url: "",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    putLike: build.mutation<any, { imageID: string }>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    deleteLike: build.mutation<any, { imageID: string }>({
      query: (data) => ({
        url: `?imageID=${data.imageID}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

  }),
});

export const { useGetOnlyLikedCatsQuery } = likesApi
export const { usePutLikeMutation } = likesApi
export const { useDeleteLikeMutation } = likesApi



