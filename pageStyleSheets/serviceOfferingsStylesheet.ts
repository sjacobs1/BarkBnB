import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#EBEBEB",
    padding: 10,
    gap: 10,
  },
  addServiceButton: {
    backgroundColor: "#225560",
    width: 56,
    height: 56,
    borderRadius: 32,
    position: "absolute",
    bottom: 40,
    right: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
export default style;
