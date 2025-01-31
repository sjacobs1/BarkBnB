import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const Layout = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/(protected)/home");
    } else {
      router.replace("/(auth)/login");
    }
  }, [user]);

  return <Stack screenOptions={{ headerShown: false }} />;
};
