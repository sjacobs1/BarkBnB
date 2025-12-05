import { Stack } from "expo-router";
import { AuthProvider } from "../AuthProvider";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./store/reduxApiProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <PaperProvider>
            <AuthProvider>
              <Stack screenOptions={{ headerShown: false }}>
                {/* Tabs Layout for Home & Profile */}
                <Stack.Screen name="(user)" />
                {/* Tabs Layout for Admin Home & Service Offerings */}
                <Stack.Screen name="(admin)" />

                {/* Add a Pet Page - Stack Navigation with Header */}
                <Stack.Screen
                  name="addAPetForm"
                  options={{
                    title: "",
                    headerBackTitle: "My Profile",
                    headerShown: true,
                  }}
                />
                <Stack.Screen
                  name="createBookingForm"
                  options={{
                    title: "",
                    headerBackTitle: "Bookings",
                    headerShown: true,
                  }}
                />
                <Stack.Screen
                  name="petFullProfilePage"
                  options={{
                    title: "",
                    headerBackTitle: "My Profile",
                    headerShown: true,
                  }}
                />
                <Stack.Screen
                  name="addAServiceForm"
                  options={{
                    title: "",
                    headerBackTitle: "Service Offerings",
                    headerShown: true,
                  }}
                />
              </Stack>
            </AuthProvider>
          </PaperProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default RootLayout;
