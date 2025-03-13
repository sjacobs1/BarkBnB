import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E1E1E1",
  },
  logoContainer: {
    backgroundColor: "#225560",
    borderRadius: 100,
    borderWidth: 7,
    borderColor: "#FFA025",
  },
  pageHeading : {
    fontSize: 20,
    marginVertical: 10
  },
  textBoxesContainer : {
    width: "100%",
    marginBottom: 5,
    marginTop: 60
  },
  emailInput: {
    width: "100%",
    height: 50,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "white",
  },
  requiredErrorText: {
    color: "red",
    minHeight: 20,
    marginBottom: 10
  },
  passwordInputContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
  },
  actionButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#225560",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "center",
  },
  actionButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  },
  moveToAlternatePageLink: {
    marginTop: 10,
  },
  highlitedText : {
    color: "#FFA025",
    fontWeight: "bold"
  },
  formikView: {
    width: "100%",
    gap: 20
  }
});

export default style