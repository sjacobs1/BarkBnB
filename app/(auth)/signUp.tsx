import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../AuthProvider";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { authStyleSheet } from "./authStyleSheet";

const SignupScreen = () => {
  const { signup } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[\W_]/, "Password must contain at least one special character")
      .required("Required"),
  });

  return (
    <View style={authStyleSheet.mainContainer}>
      <Text style={authStyleSheet.pageHeading}>Sign Up</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await signup(values.email, values.password, "user");
            Alert.alert("Success", "Account created! Please log in.");
            router.replace("/login");
          } catch (error: any) {
            Alert.alert("Sign Up Failed", error.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <TextInput
              style={[
                authStyleSheet.emailTextBox,
                { borderColor: errors.email && touched.email ? "red" : "#ccc" },
              ]}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <Text style={authStyleSheet.errorText}>{errors.email}</Text>
            )}

            <View
              style={[
                authStyleSheet.passwordViewContainer,
                {
                  borderColor:
                    errors.password && touched.password ? "red" : "#ccc",
                },
              ]}
            >
              <TextInput
                style={authStyleSheet.passwordTextBox}
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={authStyleSheet.errorText}>
                {errors.password}
              </Text>
            )}

            <Button
              title="Sign Up"
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            />

            <TouchableOpacity onPress={() => router.replace("/login")}>
              <Text style={authStyleSheet.moveToOtherPageText}>
                Already have an account? Log in
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignupScreen;
