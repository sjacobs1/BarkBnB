import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    padding: 16,
  },
  mainContainer: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 10,
    justifyContent: "center",
    borderColor: "#225560",
    gap: 8,
    flexDirection: "column",
  },
  servicePoster: {
    width: "50%",
    height: 168,
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
  },
  serviceDescription: {
    fontSize: 16,
    color: "#333",
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFA025",
    marginBottom: 16,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#225560",
  },
});

export default style;
