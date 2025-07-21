import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Unit } from "../../models/unit";
import { getLatestToken } from "../../../utils/tokenUtils";

export const unitsApi = createApi({
  reducerPath: "unitsApi",
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
    getUnits: builder.query<Unit[], void>({
      query: () => "/units",
    }),
    addUnit: builder.mutation<void, Unit>({
      query: (unit) => ({
        url: "/units",
        method: "POST",
        body: unit,
      }),
    }),
    // updateUnit: builder.mutation<void, Unit>({
    // query: (unit) => ({
    //     url: `/${unit.id}`,
    //     method: "PUT",
    //     body: unit,
    // }),
    // }),
    // deleteUnit: builder.mutation<void, string>({
    // query: (id) => ({
    //     url: `/${id}`,
    //     method: "DELETE",
    // }),
    // }),
  }),
});

export const {
  useGetUnitsQuery,
  useAddUnitMutation,
  // useUpdateUnitMutation,
  // useDeleteUnitMutation,
} = unitsApi;
