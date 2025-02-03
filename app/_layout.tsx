import { Stack } from "expo-router";
import { AuthProvider } from "../AuthProvider";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
};

export default RootLayout;
