import { StyleSheet, } from "react-native";

export const authStyleSheet = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      },
      pageHeading: {
        fontSize: 20,
        marginBottom: 10,
      },
      emailTextBox: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
      },
      passwordViewContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      passwordTextBox: {
        flex: 1, 
        paddingVertical: 10, 
      },
      errorText: {
        color: "red", 
        marginBottom: 10
      },
      moveToOtherPageText: {
        color: "blue", 
        marginTop: 10
      }
})