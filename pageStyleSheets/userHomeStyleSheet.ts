import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  scrollView: {
    backgroundColor: "#EBEBEB",
    flexGrow: 1,
    padding: 10,
    gap: 10,
  },
  mainContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EBEBEB",
    gap: 10,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#225560",
    marginBottom: 10,
  },
});

export default style;
