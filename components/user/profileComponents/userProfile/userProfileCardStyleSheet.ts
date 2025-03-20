import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // padding: 10,
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
    // backgroundColor: "red",
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
    // backgroundColor: "yellow",
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
    backgroundColor: "#E1E1E1",
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 100,
    borderColor: "#225560",
    borderWidth: 2,
  },
  userContactTextContainer: {
    // backgroundColor: "red",
    gap: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  userContactText: {
    fontWeight: 300,
  },
  logoutContainer: {
    backgroundColor: "#A4D4DF",
    width: "100%",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  logoutButton: {
    width: "70%",
    height: 50,
    backgroundColor: "#225560",
    borderRadius: 5,
    justifyContent: "center",
  },
  logoutText: {
    textAlign: "center",
    color: "white",
  },
});

export default style;
