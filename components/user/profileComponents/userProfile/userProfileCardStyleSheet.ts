import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },
  nameContainer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontSize: 30,
    fontWeight: 400
  },
  detailsGroupContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    flexDirection: "row"
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    padding: 5,
    paddingRight: 7,
    borderRadius: 30
},
iconContainer: {
    backgroundColor: "#F5F4F4",
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 100,
    borderColor: "#225560",
    borderWidth: 2
  },
  userContactTextContainer: {
    backgroundColor: "red",
    gap: 5,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  userContactText: {
    fontWeight: 300
  }
});

export default style;
