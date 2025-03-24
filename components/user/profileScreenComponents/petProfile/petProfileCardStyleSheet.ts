import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 70,
    backgroundColor: "white",
    borderRadius: 15,
    flexDirection: "row",
    marginBottom: 20
  },
  petImageContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  petImage: {
    backgroundColor: "#B19172",
    borderRadius: 5,
    height: 50,
    width: 50,
  },
  petNameContainer: {
    flex: 3,
    justifyContent: "center",
    padding: 10,
  },
  petNameText: {
    fontSize: 20,
    fontWeight: 400
  },
  checkedInStatusContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F8FA",
    gap: 5,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
});

export default style;
