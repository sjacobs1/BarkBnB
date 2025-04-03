import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  scrollView: {
    backgroundColor: "#EBEBEB",
    padding: 20,
  },
  mainContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 40
  },
  formHeadingContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#F0F8FA",
    marginTop: -20,
    marginHorizontal: -20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  formHeadingText: {
    textAlign: "center",
    fontWeight: 500
  },
  questionSectionContainer: {
    marginBottom: 25,
    gap: 10
  },
  textInput: {
    width: "100%",
    minHeight: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "white",
  },
  requiredErrorText: {
    color: "red",
  },
  petBreedInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  petBreedFilteredList: {
    borderWidth: 0.5,
    padding: 10,
    marginTop: -10,
    marginBottom: 10,
    borderRadius: 5,
  },
  questionOptionsContainer: {
    gap: 5
  },
  sterilisedAndVaccinatedContainer: {
    flexDirection: "row",
  },
  optionSpecificContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    width: "20%",
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  selectedRadioButton: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#b19172",
  },
  extraDetailsInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#225560",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: "center",
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  answerText: {
    fontWeight: 300
  },
  questionAndTooltipContainer: {
    flexDirection: "row", gap: 5 
  }
  
});

export default style;
