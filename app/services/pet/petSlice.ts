import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pet } from "../../models/pet";
import { getLatestToken } from "../../../utils/tokenUtils";

export const petsApi = createApi({
  reducerPath: "api",
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
    getPets: builder.query<Pet[], void>({
      query: () => "/pets",
    }),
    getPetById: builder.query<Pet, string>({
      query: (id) => `/${id}`,
    }),
    addPet: builder.mutation<void, Pet>({
      query: (pet) => ({
        url: "/pets",
        method: "POST",
        body: pet,
      }),
    }),
    updatePet: builder.mutation<void, Pet>({
      query: (pet) => ({
        url: `/${pet.id}`,
        method: "PUT",
        body: pet,
      }),
    }),
    deletePet: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPetsQuery,
  useGetPetByIdQuery,
  useAddPetMutation,
  useUpdatePetMutation,
  useDeletePetMutation,
} = petsApi;
