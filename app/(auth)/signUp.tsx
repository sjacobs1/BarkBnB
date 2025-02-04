// app/signup/index.tsx
import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuth } from "../../AuthProvider";
import { useRouter } from "expo-router";
import { UserType } from "../../AuthProvider";

const SignupScreen = () => {
  const { signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserType>("user");

  const handleSignup = async () => {
    console.log("Attempting signup with email:", email, "and role:", role);

    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      await signup(email, password, role);
      Alert.alert("Success", "Account created! Please log in.");
      console.log("Navigating to login screen...");
      router.replace("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      Alert.alert("Sign In Failed", error.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Sign Up</Text>
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
      <Button
        title="Sign Up as User"
        onPress={() => {
          setRole("user");
          handleSignup();
        }}
      />
      <Button
        title="Sign Up as Admin"
        onPress={() => {
          setRole("admin");
          handleSignup();
        }}
      />
    </View>
  );
};

export default SignupScreen;
