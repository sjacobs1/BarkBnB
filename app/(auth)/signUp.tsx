import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useAuth } from "../../AuthProvider";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
// @ts-ignore
import Logo from "../../assets/logo.svg";
import style from "./authStyleSheet";

const SignupScreen = () => {
  const { signup } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    cellNumber: Yup.string()
      .length(10, "Enter valid SA cell number")
      .required("Required"),
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
    <KeyboardAvoidingView behavior="padding" style={style.mainContainer}>
      <View style={style.logoContainer}>
        <Logo height={150} width={150} />
      </View>
      <Text style={style.pageHeading}>Sign Up</Text>
      <Text>Welcome to BarkBnB! create an account to continue</Text>
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          cellNumber: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await signup(
              values.firstName,
              values.lastName,
              values.cellNumber,
              values.email,
              values.password,
              "user"
            );
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
            <View style={style.textBoxesContainer}>
              <TextInput
                style={[
                  style.emailInput,
                  {
                    borderColor:
                      errors.firstName && touched.firstName ? "red" : "#b19172",
                  },
                ]}
                placeholder="First Name"
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                autoCapitalize="words"
                keyboardType="email-address"
              />
              <Text style={style.requiredErrorText}>
                {errors.firstName && touched.firstName ? errors.firstName : " "}
              </Text>

              <TextInput
                style={[
                  style.emailInput,
                  {
                    borderColor:
                      errors.firstName && touched.firstName ? "red" : "#b19172",
                  },
                ]}
                placeholder="Last Name"
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                autoCapitalize="words"
                keyboardType="email-address"
              />
              <Text style={style.requiredErrorText}>
                {errors.lastName && touched.lastName ? errors.lastName : " "}
              </Text>

              <TextInput
                style={[
                  style.emailInput,
                  {
                    borderColor:
                      errors.cellNumber && touched.cellNumber
                        ? "red"
                        : "#b19172",
                  },
                ]}
                placeholder="Cellphone Number"
                onChangeText={handleChange("cellNumber")}
                onBlur={handleBlur("cellNumber")}
                value={values.cellNumber}
                autoCapitalize="words"
                keyboardType="phone-pad"
              />
              <Text style={style.requiredErrorText}>
                {errors.cellNumber && touched.cellNumber
                  ? errors.cellNumber
                  : " "}
              </Text>

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
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <Text style={style.requiredErrorText}>
                {errors.password && touched.password ? errors.password : " "}
              </Text>
            </View>

            <TouchableOpacity
              style={[style.actionButton, { opacity: isSubmitting ? 0.5 : 1 }]}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              <Text style={style.actionButtonText}>Create account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace("/login")}>
              <Text style={style.moveToAlternatePageLink}>
                Already have an account?
                <Text style={style.highlitedText}> Log in</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
