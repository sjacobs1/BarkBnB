import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Booking } from "../../models/booking";
import { getLatestToken } from "../../../utils/tokenUtils";

export const bookingsApi = createApi({
  reducerPath: "bookingsApi",
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
    addBooking: builder.mutation<void, Booking>({
      query: (booking) => ({
        url: "/bookings",
        method: "POST",
        body: booking,
      }),
    }),
  }),
});

export const { useAddBookingMutation } = bookingsApi;
