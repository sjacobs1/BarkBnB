import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import style from "../pageStyleSheets/addAPetFormStyleSheet";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import BREEDS from "../utils/dogBreedsList";
import { SegmentedButtons } from "react-native-paper";

const AddAPet = () => {
  const [filteredBreeds, setFilteredBreeds] = useState(BREEDS);
  const [showDropdown, setShowDropdown] = useState(false);

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
        onSubmit={(values) => console.log(values)}
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
                We need a few details about your furry firend.{"\n"}
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
                    setFilteredBreeds(
                      BREEDS.filter((b) =>
                        b.toLowerCase().includes(text.toLowerCase())
                      )
                    );
                    setShowDropdown(true);
                  } else {
                    setShowDropdown(false);
                  }
                }}
              />

              {showDropdown && filteredBreeds.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue("breed", filteredBreeds[0]);
                    setShowDropdown(false);
                  }}
                  style={style.petBreedFilteredList}
                >
                  <Text>{filteredBreeds[0]}</Text>
                </TouchableOpacity>
              )}

              {touched.breed && errors.breed && (
                <Text style={style.requiredErrorText}>{errors.breed}</Text>
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
                      values.gender === "male" ? { backgroundColor: "#b19172" } : {},
                      { borderRadius: 5 },
                    ],
                    labelStyle: values.gender === "male" ? { color: "white" } : { color: "black" },
                  },
                  {
                    value: "female",
                    label: "Female",
                    style: [
                      values.gender === "female" ? { backgroundColor: "#b19172" } : {},
                      { borderRadius: 5 },
                    ],
                    labelStyle: values.gender === "female" ? { color: "white" } : { color: "black" },
                  },
                ]}
                style={{}}
              />
              {touched.gender && errors.gender && (
                <Text style={style.requiredErrorText}>{errors.gender}</Text>
              )}
            </View>

            <View style={style.questionSectionContainer}>
              <Text>Is your pet spayed or neutered?</Text>
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
              <Text>Are your pet’s vaccinations up to date?</Text>
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
              <Text>Does your pet have any medical conditions?</Text>
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
                    placeholder="Please provide details"
                    onChangeText={handleChange("medicalDetails")}
                    value={values.medicalDetails}
                    multiline={true}
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
              <Text>Does your pet have special dietary requirements?</Text>
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
                    placeholder="Please provide details"
                    onChangeText={handleChange("dietaryDetails")}
                    value={values.dietaryDetails}
                    multiline={true}
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
