import {
  View,
  Text,
  Alert,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useAddServiceOfferingMutation } from "./services/packages/serviceOfferingsSlice";
import { useServicesStore } from "../hooks/serviceStore";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";
import style from "../pageStyleSheets/addAServiceFormStyleSheet";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface AddServiceFormValues {
  name: string;
  description: string;
  price: string;
  serviceImage: string | null; // Assuming you want to handle image upload later
}

const AddAService = () => {
  const [addServiceOffering] = useAddServiceOfferingMutation();
  const addServiceToStore = useServicesStore((state) => state.addService);

  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const initialValues: AddServiceFormValues = {
    name: "",
    description: "",
    price: "",
    serviceImage: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Service name is required"),
    description: Yup.string().required(),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    serviceImage: Yup.string().nullable(),
  });

  const pickImage = async (setFieldValue: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const selectedImage = result.assets[0];
      setFieldValue("serviceImage", selectedImage.uri);
    }
  };

  const handleSubmit = async (values: AddServiceFormValues) => {
    try {
      let serviceImageUrl = null;
      if (values.serviceImage) {
        const response = await fetch(values.serviceImage);
        const blob = await response.blob();
        const storage = getStorage();
        const storageRef = ref(storage, `serviceImages/${Date.now()}.jpg`);
        await uploadBytes(storageRef, blob);
        serviceImageUrl = await getDownloadURL(storageRef);
      }
      const serviceOfferingData = {
        name: values.name,
        description: values.description,
        price: Number(values.price),
        serviceImageUrl,
      };

      console.log("Service Offering Data:", serviceOfferingData);
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
                returnKeyType="next"
                submitBehavior={"newline"}
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
                multiline={true}
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
                placeholder="R"
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                value={values.price.toString()}
                keyboardType="numeric"
              />
              {errors.price && touched.price && (
                <Text style={style.requiredErrorText}>{errors.price}</Text>
              )}
            </View>

            <TouchableOpacity onPress={() => pickImage(setFieldValue)}>
              <Text>Select Image</Text>
            </TouchableOpacity>
            {values.serviceImage && (
              <Image
                source={{ uri: values.serviceImage }}
                style={{ width: 100, height: 100 }}
              />
            )}

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
