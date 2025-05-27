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
    marginBottom: 40,
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
    fontWeight: 500,
  },
  formSectionContainer: {
    marginBottom: 25,
    gap: 10,
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
});

export default style;
