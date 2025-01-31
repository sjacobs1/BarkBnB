import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { Redirect } from "expo-router";

export default function App() {
  const { user } = useAuth();

  return user ? (
    <Redirect href="/(protected)/home" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
