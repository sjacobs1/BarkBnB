import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import style from "../pageStyleSheets/addAPetFormStyleSheet";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import BREEDS from "../utils/dogBreedsList";
import { SegmentedButtons } from "react-native-paper";
import FormTooltip from "../components/user/profileScreenComponents/petProfile/formTooltip";
import Fuse from "fuse.js";
import { useAddPetMutation } from "../app/services/pet/petSlice";
import { auth } from "../firebaseConfig";
import { usePetStore } from "../hooks/petStore";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

const AddAPet = () => {
  const [filteredBreeds, setFilteredBreeds] = useState(BREEDS);
  const [showDropdown, setShowDropdown] = useState(false);
  const fuse = new Fuse(BREEDS, {
    includeScore: true,
    threshold: 0.7,
  });
  const user_uid = auth.currentUser?.uid;
  const [addPet] = useAddPetMutation();
  const addPetToStore = usePetStore((state) => state.addPet);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    petName: Yup.string().required("Pet name is required"),
    birthDate: Yup.date().required("Birth date is required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Select a gender")
      .required("Gender is required"),
    breed: Yup.string().required("Breed is required"),
    sterilised: Yup.string()
      .oneOf(["yes", "no"], "Select an option")
      .required("Sterilisation status is required"),
    vaccinated: Yup.string()
      .oneOf(["yes", "no"], "Select an option")
      .required("Vaccination status is required"),
    medicalNeeds: Yup.string()
      .oneOf(["yes", "no"], "Select an option")
      .required("Medical needs status is required"),
    medicalDetails: Yup.string().when("medicalNeeds", {
      is: "yes",
      then: () => Yup.string().required("Please provide medical details"),
    }),
    dietaryNeeds: Yup.string()
      .oneOf(["yes", "no"], "Select an option")
      .required("Dietary needs status is required"),
    dietaryDetails: Yup.string().when("dietaryNeeds", {
      is: "yes",
      then: () => Yup.string().required("Please provide dietary details"),
    }),
  });

  const handleSubmit = async (values: any) => {
    try {
      const petData = {
        user_uid: user_uid || "",
        name: values.petName,
        breed: values.breed,
        dietary_requirements:
          values.dietaryNeeds === "no" ? "no" : values.dietaryDetails || "",
        medical_requirements:
          values.medicalNeeds === "no" ? "no" : values.medicalDetails || "",
        gender: values.gender,
        birthdate: values.birthDate,
        vaccine_status: values.vaccinated,
        neutered: values.sterilised === "yes",
      };

      await addPet(petData).unwrap();
      addPetToStore(petData);

      Alert.alert("Pet added successfully!", "", [
        {
          text: "OK",
          onPress: () => router.replace("/(user)/profile"),
        },
      ]);
      9;
    } catch (error) {
      console.error("Failed to add pet:", error);
      alert("Failed to add pet. Please try again.");
    }
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={style.scrollView}
    >
      <Formik
        initialValues={{
          petName: "",
          birthDate: new Date(),
          gender: "",
          breed: "",
          sterilised: "",
          vaccinated: "",
          medicalNeeds: "",
          dietaryNeeds: "",
          medicalDetails: "",
          dietaryDetails: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
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
                We need a few details about your furry friend.{"\n"}
                Please enter your pet's information below !
              </Text>
            </View>
            <View style={style.questionSectionContainer}>
              <Text>Name</Text>
              <TextInput
                style={[
                  style.textInput,
                  {
                    borderColor:
                      errors.petName && touched.petName ? "red" : "#b19172",
                  },
                ]}
                placeholder="Your pet's name"
                onChangeText={handleChange("petName")}
                onBlur={handleBlur("petName")}
                autoCapitalize="words"
                value={values.petName}
              />
              {touched.petName && errors.petName && (
                <Text style={style.requiredErrorText}>{errors.petName}</Text>
              )}
            </View>

            <View style={style.questionSectionContainer}>
              <Text>Birth Date</Text>
              <DateTimePicker
                value={values.birthDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) =>
                  setFieldValue("birthDate", selectedDate || values.birthDate)
                }
              />
              {touched.birthDate &&
                errors.birthDate &&
                typeof errors.birthDate === "string" && (
                  <Text style={style.requiredErrorText}>
                    {errors.birthDate}
                  </Text>
                )}
            </View>

            <View style={style.questionSectionContainer}>
              <Text>Breed</Text>
              <TextInput
                style={[
                  style.textInput,
                  {
                    borderColor:
                      errors.breed && touched.breed ? "red" : "#b19172",
                  },
                ]}
                placeholder="eg: Labrador"
                value={values.breed}
                onFocus={() => setShowDropdown(false)}
                onChangeText={(text) => {
                  setFieldValue("breed", text);
                  if (text) {
                    const results = fuse.search(text);
                    const matched = results.map((result) => result.item);
                    setFilteredBreeds(matched);
                    setShowDropdown(true);
                  } else {
                    setShowDropdown(false);
                  }
                }}
              />

              {showDropdown && filteredBreeds.length > 0 && (
                <View style={style.petBreedFilteredList}>
                  {filteredBreeds.map((breed, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setFieldValue("breed", breed);
                        setShowDropdown(false);
                      }}
                      style={style.dropdownItem}
                    >
                      <Text>{breed}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={style.questionSectionContainer}>
              <Text>Gender</Text>
              <SegmentedButtons
                value={values.gender}
                onValueChange={(value) => setFieldValue("gender", value)}
                buttons={[
                  {
                    value: "male",
                    label: "Male",
                    style: [
                      values.gender === "male"
                        ? { backgroundColor: "#b19172" }
                        : {},
                      { borderRadius: 5 },
                    ],
                    labelStyle:
                      values.gender === "male"
                        ? { color: "white" }
                        : { color: "black" },
                  },
                  {
                    value: "female",
                    label: "Female",
                    style: [
                      values.gender === "female"
                        ? { backgroundColor: "#b19172" }
                        : {},
                      { borderRadius: 5 },
                    ],
                    labelStyle:
                      values.gender === "female"
                        ? { color: "white" }
                        : { color: "black" },
                  },
                ]}
                style={{}}
              />
              {touched.gender && errors.gender && (
                <Text style={style.requiredErrorText}>{errors.gender}</Text>
              )}
            </View>

            <View style={style.questionSectionContainer}>
              <View style={style.questionAndTooltipContainer}>
                <Text>Is your pet spayed or neutered?</Text>
                <FormTooltip title="ovaries / testicles removed." />
              </View>
              <View style={style.questionOptionsContainer}>
                {["yes", "no"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={style.optionSpecificContainer}
                    onPress={() => setFieldValue("sterilised", option)}
                  >
                    <View style={style.radioButton}>
                      {values.sterilised === option && (
                        <View style={style.selectedRadioButton} />
                      )}
                    </View>
                    <Text style={style.answerText}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {touched.sterilised && errors.sterilised && (
                <Text style={style.requiredErrorText}>{errors.sterilised}</Text>
              )}
            </View>

            <View style={style.questionSectionContainer}>
              <View style={style.questionAndTooltipContainer}>
                <Text>Are your pet’s vaccinations up to date?</Text>
                <FormTooltip title="core vaccines (e.g., rabies, distemper)." />
              </View>
              <View style={style.questionOptionsContainer}>
                {["yes", "no"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={style.optionSpecificContainer}
                    onPress={() => setFieldValue("vaccinated", option)}
                  >
                    <View style={style.radioButton}>
                      {values.vaccinated === option && (
                        <View style={style.selectedRadioButton} />
                      )}
                    </View>
                    <Text style={style.answerText}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {touched.vaccinated && errors.vaccinated && (
                <Text style={style.requiredErrorText}>{errors.vaccinated}</Text>
              )}
            </View>

            <View style={style.questionSectionContainer}>
              <View style={style.questionAndTooltipContainer}>
                <Text>Does your pet have any medical conditions?</Text>
                <FormTooltip title="chronic illnesses, allergies, etc." />
              </View>
              <View style={style.questionOptionsContainer}>
                {["yes", "no"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={style.optionSpecificContainer}
                    onPress={() => setFieldValue("medicalNeeds", option)}
                  >
                    <View style={style.radioButton}>
                      {values.medicalNeeds === option && (
                        <View style={style.selectedRadioButton} />
                      )}
                    </View>
                    <Text style={style.answerText}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {values.medicalNeeds === "yes" && (
                <>
                  <TextInput
                    style={[
                      style.textInput,
                      {
                        borderColor:
                          errors.medicalDetails && touched.medicalDetails
                            ? "red"
                            : "#b19172",
                        marginTop: 10,
                        maxHeight: 100,
                      },
                    ]}
                    placeholder="Provide details like medical condition and medication taken"
                    onChangeText={handleChange("medicalDetails")}
                    value={values.medicalDetails}
                    multiline={true}
                    maxLength={200}
                  />
                  {touched.medicalDetails && errors.medicalDetails && (
                    <Text style={style.requiredErrorText}>
                      {errors.medicalDetails}
                    </Text>
                  )}
                </>
              )}
              {touched.medicalNeeds && errors.medicalNeeds && (
                <Text style={style.requiredErrorText}>
                  {errors.medicalNeeds}
                </Text>
              )}
            </View>

            <View style={style.questionSectionContainer}>
              <View style={style.questionAndTooltipContainer}>
                <Text>Does your pet have special dietary needs?</Text>
                <FormTooltip title="allergies, intolerances, specific requirements." />
              </View>
              <View style={style.questionOptionsContainer}>
                {["yes", "no"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={style.optionSpecificContainer}
                    onPress={() => setFieldValue("dietaryNeeds", option)}
                  >
                    <View style={style.radioButton}>
                      {values.dietaryNeeds === option && (
                        <View style={style.selectedRadioButton} />
                      )}
                    </View>
                    <Text style={style.answerText}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {values.dietaryNeeds === "yes" && (
                <>
                  <TextInput
                    style={[
                      style.textInput,
                      {
                        borderColor:
                          errors.dietaryDetails && touched.dietaryDetails
                            ? "red"
                            : "#b19172",
                        marginTop: 10,
                        maxHeight: 100,
                      },
                    ]}
                    placeholder="Provide specific dietary requirements, allergies, etc."
                    onChangeText={handleChange("dietaryDetails")}
                    value={values.dietaryDetails}
                    multiline={true}
                    maxLength={200}
                  />
                  {touched.dietaryDetails && errors.dietaryDetails && (
                    <Text style={style.requiredErrorText}>
                      {errors.dietaryDetails}
                    </Text>
                  )}
                </>
              )}
              {touched.dietaryNeeds && errors.dietaryNeeds && (
                <Text style={style.requiredErrorText}>
                  {errors.dietaryNeeds}
                </Text>
              )}
            </View>

            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={style.submitButton}
            >
              <Text style={style.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default AddAPet;
