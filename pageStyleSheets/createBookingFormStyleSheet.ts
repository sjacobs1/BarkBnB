import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 16,
    backgroundColor: "#EBEBEB",
  },
  container: {
    padding: 16,
  },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  iconStyle: {
    width: 32,
    height: 24,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  item: {
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  selectedPetIconStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectedItemBackground: {
    backgroundColor: "#e6f4ea",
    borderRadius: 8,
  },
});

export default style;
