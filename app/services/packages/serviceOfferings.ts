import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ServiceOffering } from "../../models/serviceOffering";
import { getLatestToken } from "../../../utils/tokenUtils";

export const serviceOfferingsApi = createApi({
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
    getServiceOfferings: builder.query<ServiceOffering[], void>({
      query: () => "/service-offerings",
    }),
    addServiceOffering: builder.mutation<void, ServiceOffering>({
      query: (serviceOffering) => ({
        url: "/service-offerings",
        method: "POST",
        body: serviceOffering,
      }),
    }),
    updateServiceOffering: builder.mutation<void, ServiceOffering>({
      query: (serviceOffering) => ({
        url: `/${serviceOffering.id}`,
        method: "PUT",
        body: serviceOffering,
      }),
    }),
    deleteServiceOffering: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetServiceOfferingsQuery,
  useAddServiceOfferingMutation,
  useUpdateServiceOfferingMutation,
  useDeleteServiceOfferingMutation,
} = serviceOfferingsApi;
