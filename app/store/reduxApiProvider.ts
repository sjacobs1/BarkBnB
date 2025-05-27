import { configureStore } from "@reduxjs/toolkit";
import { petsApi } from "../services/pet/petSlice";
import { userApi } from "../services/user/userSlice";
import { serviceOfferingsApi } from "../services/packages/serviceOfferingsSlice";

export const store = configureStore({
  reducer: {
    [petsApi.reducerPath]: petsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [serviceOfferingsApi.reducerPath]: serviceOfferingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      petsApi.middleware,
      userApi.middleware,
      serviceOfferingsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
