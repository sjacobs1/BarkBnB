import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useAuth } from "../../../AuthProvider";
import { useRouter } from "expo-router";
import * as Yup from "yup";
import { Formik } from "formik";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
// @ts-ignore
import Logo from "../../../assets/logo.svg";
import style from "./loginStylesheet";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const { login, role } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: LoginFormValues = { email: "", password: "" };
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

  useEffect(() => {
    if (role) {
      router.replace(role === "admin" ? "/adminHome" : "/userHome");
    }
  }, [role]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={30}
      style={style.mainContainer}
    >
      <View style={style.logoContainer}>
        <Logo height={150} width={150} />
      </View>
      <Text style={style.signInText}>Sign In</Text>
      <Text>Enter your details to continue</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await login(values.email, values.password);
          } catch (error: any) {
            Alert.alert("Login Failed", error.message);
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
            <View style={style.textBoxesContainer}>
              <TextInput
                style={[
                  style.emailInput,
                  {
                    borderColor:
                      errors.email && touched.email ? "red" : "#b19172",
                  },
                ]}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <Text style={style.requiredErrorText}>
                {errors.email && touched.email ? errors.email : " "}
              </Text>

              <View
                style={[
                  style.passwordInputContainer,
                  {
                    borderColor:
                      errors.password && touched.password ? "red" : "#b19172",
                  },
                ]}
              >
                <TextInput
                  style={style.passwordInput}
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Ionicons name="eye-off-outline" size={24} color="black" />
                  ) : (
                    <Ionicons name="eye-outline" size={24} color="black" />
                  )}
                </TouchableOpacity>
              </View>

              <Text style={style.requiredErrorText}>
                {errors.password && touched.password ? errors.password : " "}
              </Text>
            </View>

            <TouchableOpacity
              style={[style.loginButton, { opacity: isSubmitting ? 0.5 : 1 }]}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              <Text style={style.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/signUp")}>
              <Text style={style.signUpText}>
                Don't have an account?
                <Text style={style.signUpLink}> Sign up</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
