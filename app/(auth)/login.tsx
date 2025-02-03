import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuth } from "../../AuthProvider";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (!username.trim()) {
      Alert.alert("Error", "Please enter a username");
      return;
    }

    const role = username.toLowerCase() === "admin" ? "admin" : "user";
    login(role);
    router.replace(role === "admin" ? "/adminHome" : "/userHome");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Login Page</Text>
      <TextInput
        style={{
          width: "80%",
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          marginBottom: 10,
        }}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
