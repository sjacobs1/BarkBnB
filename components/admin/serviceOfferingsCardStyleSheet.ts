import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#225560",
    gap: 10,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFA025",
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "semibold",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  readMoreButton: {
    color: "blue",
    marginTop: 5,
  },
  descriptionCntainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#225560",
  },
});
export default style;
