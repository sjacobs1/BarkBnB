import { Stack } from "expo-router";
import { AuthProvider } from "../AuthProvider";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./store/reduxApiProvider";

const RootLayout = () => {
  return (
    <Provider store={store}>
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
                title: "Add A Pet",
                headerBackTitle: "My Profile",
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="petFullProfilePage"
              options={{
                title: "Pet Profile",
                headerBackTitle: "My Profile",
                headerShown: true,
              }}
            />
          </Stack>
        </AuthProvider>
      </PaperProvider>
    </Provider>
  );
};

export default RootLayout;
