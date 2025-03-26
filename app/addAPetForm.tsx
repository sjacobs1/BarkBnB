import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import style from "../pageStyleSheets/addAPetFormStyleSheet";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

const BREEDS = [
  "Labrador Retriever",
  "Golden Retriever",
  "German Shepherd",
  "Poodle",
  "Bulldog",
  "Beagle",
  "Chihuahua",
  "Dachshund",
];

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
        <View style={{ padding: 20 }}>
          <Text>Pet Name</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            placeholder="Name"
            onChangeText={handleChange("petName")}
            onBlur={handleBlur("petName")}
            value={values.petName}
          />
          {touched.petName && errors.petName && (
            <Text style={{ color: "red" }}>{errors.petName}</Text>
          )}

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
              <Text style={{ color: "red" }}>{errors.birthDate}</Text>
            )}

          <Text>Breed</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            value={values.breed}
            onFocus={() => setShowDropdown(true)}
            onChangeText={(text) => {
              setFieldValue("breed", text);
              setFilteredBreeds(
                BREEDS.filter((b) =>
                  b.toLowerCase().includes(text.toLowerCase())
                )
              );
              setShowDropdown(true);
            }}
          />
          {showDropdown && (
            <FlatList
              data={filteredBreeds}
              keyExtractor={(item) => item}
              style={{ maxHeight: 100, borderWidth: 1 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue("breed", item);
                    setShowDropdown(false);
                  }}
                  style={{ padding: 10, borderBottomWidth: 1 }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}
          {touched.breed && errors.breed && (
            <Text style={{ color: "red" }}>{errors.breed}</Text>
          )}

          <Text>Gender</Text>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            {["male", "female"].map((genderOption) => (
              <TouchableOpacity
                key={genderOption}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 15,
                }}
                onPress={() => setFieldValue("gender", genderOption)}
              >
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 5,
                  }}
                >
                  {values.gender === genderOption && (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: "red",
                      }}
                    />
                  )}
                </View>
                <Text>
                  {genderOption.charAt(0).toUpperCase() + genderOption.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {touched.gender && errors.gender && (
            <Text style={{ color: "red" }}>{errors.gender}</Text>
          )}

          <Text>Sterilised?</Text>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            {["yes", "no"].map((option) => (
              <TouchableOpacity
                key={option}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 15,
                }}
                onPress={() => setFieldValue("sterilised", option)}
              >
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 5,
                  }}
                >
                  {values.sterilised === option && (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: "blue",
                      }}
                    />
                  )}
                </View>
                <Text>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {touched.sterilised && errors.sterilised && (
            <Text style={{ color: "red" }}>{errors.sterilised}</Text>
          )}

          <Text>Vaccinated?</Text>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            {["yes", "no"].map((option) => (
              <TouchableOpacity
                key={option}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 15,
                }}
                onPress={() => setFieldValue("vaccinated", option)}
              >
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 5,
                  }}
                >
                  {values.vaccinated === option && (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: "green",
                      }}
                    />
                  )}
                </View>
                <Text>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {touched.vaccinated && errors.vaccinated && (
            <Text style={{ color: "red" }}>{errors.vaccinated}</Text>
          )}

          <Text>Medical Needs?</Text>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            {["yes", "no"].map((option) => (
              <TouchableOpacity
                key={option}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 15,
                }}
                onPress={() => setFieldValue("medicalNeeds", option)}
              >
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 5,
                  }}
                >
                  {values.medicalNeeds === option && (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: "blue",
                      }}
                    />
                  )}
                </View>
                <Text>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {values.medicalNeeds === "yes" && (
            <TextInput
              style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
              placeholder="Please provide details"
              onChangeText={handleChange("medicalDetails")}
              value={values.medicalDetails}
            />
          )}
          {touched.medicalNeeds && errors.medicalNeeds && (
            <Text style={{ color: "red" }}>{errors.medicalNeeds}</Text>
          )}

          <Text>Dietary Needs?</Text>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            {["yes", "no"].map((option) => (
              <TouchableOpacity
                key={option}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 15,
                }}
                onPress={() => setFieldValue("dietaryNeeds", option)}
              >
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 5,
                  }}
                >
                  {values.dietaryNeeds === option && (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: "orange",
                      }}
                    />
                  )}
                </View>
                <Text>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {values.dietaryNeeds === "yes" && (
            <TextInput
              style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
              placeholder="Please provide details"
              onChangeText={handleChange("dietaryDetails")}
              value={values.dietaryDetails}
            />
          )}
          {
          touched.dietaryNeeds && errors.dietaryNeeds && (
            <Text style={{ color: "red" }}>{errors.dietaryNeeds}</Text>
          )}

          <TouchableOpacity
            onPress={() => handleSubmit}
            style={{ backgroundColor: "blue", padding: 10 }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default AddAPet;
