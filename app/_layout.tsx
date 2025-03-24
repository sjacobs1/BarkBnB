import { Stack } from "expo-router";
import { AuthProvider } from "../AuthProvider";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
      {/* Tabs Layout for Home & Profile */}
      <Stack.Screen name="(user)" />
      
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
  );
};

export default RootLayout;
