import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../models/user";
import { getLatestToken } from "../../../utils/tokenUtils";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: async (headers) => {
      const token = await getLatestToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => "/profile",
    }),
    addUser: builder.mutation<void, User>({
      query: (user) => ({
        url: "/profile",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useGetUserQuery, useAddUserMutation } = userApi;
