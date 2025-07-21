import { create } from "zustand";
import { Booking } from "../app/models/booking";

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  setBookings: (bookings: Booking[]) => void;
  selectedBooking: Booking | null;
  setSelectedBooking: (booking: Booking | null) => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  addBooking: (booking: Booking) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),
  setBookings: (bookings: Booking[]) => set(() => ({ bookings })),
  selectedBooking: null,
  setSelectedBooking: (booking) => set({ selectedBooking: booking }),
}));
