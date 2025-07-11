import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#225560",
    gap: 10,
    flexDirection: "column",
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFA025",
  },
  servicePoster: {
    width: "100%",
    height: 350,
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
