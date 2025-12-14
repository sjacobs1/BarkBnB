import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ServiceOffering } from "../../models/serviceOffering";
import { getLatestToken } from "../../../utils/tokenUtils";

export const serviceOfferingsApi = createApi({
  reducerPath: "serviceOfferingsApi",
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
  tagTypes: ["ServiceOffering"],
  endpoints: (builder) => ({
    getServiceOfferings: builder.query<ServiceOffering[], void>({
      query: () => "/service-offerings",
      providesTags: (result) => [
        { type: "ServiceOffering" as const, id: "LIST" },
        // map over an empty array when result is undefined; filter out items without id
        ...(result ?? [])
          .filter((s) => s.id)
          .map((s) => ({ type: "ServiceOffering" as const, id: s.id! })),
      ],
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
        url: `service-offerings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ServiceOffering" as const, id },
        { type: "ServiceOffering" as const, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetServiceOfferingsQuery,
  useAddServiceOfferingMutation,
  useUpdateServiceOfferingMutation,
  useDeleteServiceOfferingMutation,
} = serviceOfferingsApi;
