import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#225560",
    gap: 8,
    flexDirection: "column",
    width: "48%",
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#FFA025",
    textAlign: "center",
  },
  servicePoster: {
    width: "100%",
    height: 144,
    resizeMode: "cover",
    borderRadius: 10,
  },
  headerContainer: {
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#225560",
  },
});
export default style;
