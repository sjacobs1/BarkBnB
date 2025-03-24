import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    gap: 10,
    backgroundColor: "white",
  },
  nameAndEditContainer: {
    width: "100%",
  },
  nameContainer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  editIconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  nameText: {
    fontSize: 30,
    fontWeight: 400,
  },
  detailsGroupContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    flexDirection: "row",
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    padding: 5,
    paddingRight: 7,
    borderRadius: 30,
  },
  iconContainer: {
    backgroundColor: "#EBEBEB",
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 100,
    borderColor: "#225560",
    borderWidth: 2,
  },
  userContactTextContainer: {
    gap: 5,
    alignItems: "flex-start",
  },
  userContactText: {
    fontWeight: 300,
  },
  logoutContainer: {
    backgroundColor: "#F0F8FA",
    width: "100%",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  logoutButton: {
    width: "70%",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#225560",
  },
  logoutText: {
    textAlign: "center",
    color: "#225560",
  },
});

export default style;
