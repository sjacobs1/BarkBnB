import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import { useAuth } from "../../AuthProvider";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const { login, role } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (isLoggingIn && role) {
      console.log("User role after login:", role);
      if (role === "admin") {
        router.replace("/adminHome");
      } else {
        router.replace("/userHome");
      }
      setIsLoggingIn(false); 
    }
  }, [role]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      setIsLoggingIn(true); 
      await login(email, password);
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
      setIsLoggingIn(false);
    }
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
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={{
          width: "80%",
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          marginBottom: 10,
        }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => router.push("/signUp")}>
        <Text style={{ color: "blue", marginTop: 10 }}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
