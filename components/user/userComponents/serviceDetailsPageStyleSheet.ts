import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    padding: 8,
  },
  mainContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    borderColor: "#225560",
    gap: 8,
    flexDirection: "column",
  },
  servicePoster: {
    width: "100%",
    height: 300,
    borderRadius: 12,
  },
  serviceDetailsContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#225560",
    marginBottom: 8,
    alignSelf: "center",
  },
  serviceDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 32,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFA025",
    margin: 8,
    alignSelf: "center",
  },
  divider: {
    width: "60%",
    height: 1,
    backgroundColor: "#225560",
    alignSelf: "center",
    marginBottom: 8,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  loadingIndicator: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});

export default style;
