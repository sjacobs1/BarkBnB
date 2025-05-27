import {
  View,
  Text,
  Alert,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAddServiceOfferingMutation } from "./services/packages/serviceOfferingsSlice";
import { useServicesStore } from "../hooks/serviceStore";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";
import style from "../pageStyleSheets/addAServiceFormStyleSheet";
import { TextInput } from "react-native-paper";
interface AddServiceFormValues {
  name: string;
  description: string;
  price: string;
}

const AddAService = () => {
  const [addServiceOffering] = useAddServiceOfferingMutation();
  const addServiceToStore = useServicesStore((state) => state.addService);

  const initialValues: AddServiceFormValues = {
    name: "",
    description: "",
    price: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Service name is required"),
    description: Yup.string().required(),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
  });

  const handleSubmit = async (values: AddServiceFormValues) => {
    try {
      const serviceOfferingData = {
        name: values.name,
        description: values.description,
        price: Number(values.price),
      };

      await addServiceOffering(serviceOfferingData).unwrap();
      addServiceToStore(serviceOfferingData);

      Alert.alert("Service added successfully", "", [
        {
          text: "OK",
          onPress: () => router.push("/(admin)/serviceOfferings"),
        },
      ]);
    } catch (error) {
      console.error("Error adding service offering:", error);
      Alert.alert("Failed to add service");
    }
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={style.mainContainer}>
            <View style={style.formHeadingContainer}>
              <Text style={style.formHeadingText}>
                Please enter the service details below.
              </Text>
            </View>
            <View style={style.formSectionContainer}>
              <Text>Name</Text>
              <TextInput
                style={[
                  style.textInput,
                  {
                    borderColor:
                      errors.name && touched.name ? "red" : "#b19172",
                  },
                ]}
                placeholder="Service package name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                autoCapitalize="words"
                value={values.name}
              />
              {errors.name && touched.name && (
                <Text style={style.requiredErrorText}>{errors.name}</Text>
              )}
            </View>

            <View style={style.formSectionContainer}>
              <Text>Description</Text>
              <TextInput
                style={[
                  style.textInput,
                  {
                    borderColor:
                      errors.description && touched.description
                        ? "red"
                        : "#b19172",
                  },
                ]}
                placeholder="Service package description"
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                multiline
              />
              {errors.description && touched.description && (
                <Text style={style.requiredErrorText}>
                  {errors.description}
                </Text>
              )}
            </View>

            <View style={style.formSectionContainer}>
              <Text>Price</Text>
              <TextInput
                style={[
                  style.textInput,
                  {
                    borderColor:
                      errors.price && touched.price ? "red" : "#b19172",
                  },
                ]}
                placeholder="Service package price"
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                value={values.price.toString()}
                keyboardType="numeric"
              />
              {errors.price && touched.price && (
                <Text style={style.requiredErrorText}>{errors.price}</Text>
              )}
            </View>

            <TouchableOpacity
              style={style.submitButton}
              onPress={() => handleSubmit()}
            >
              <Text style={style.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default AddAService;
