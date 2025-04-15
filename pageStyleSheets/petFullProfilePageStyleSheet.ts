import { StyleSheet } from "react-native";

const s = StyleSheet.create({
    page: {
      padding: 20,
    },
    mainContainer: {
      backgroundColor: "white",
      width: "100%",
      borderRadius: 10,
      padding: 20,
    },
    petImageContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    petNameText: {
      fontSize: 24,
      fontWeight: "bold",
    },
    petImage: {
      width: 180,
      height: 180,
      borderRadius: 100,
      marginBottom: 20,
      borderWidth: 3,
      borderColor: "#E0E0E0",
    },
    rowCell: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 15,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
    },
    dropdownBox: {
      marginTop: 10,
      backgroundColor: "#F5F5F5",
      padding: 10,
      borderRadius: 5,
    },
  });

  export default s;