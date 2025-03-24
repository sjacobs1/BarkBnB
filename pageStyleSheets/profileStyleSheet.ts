import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#EBEBEB",
        padding: 20
    },
    addPetsContainer: {
        paddingVertical: 30,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 2,
        gap: 10
    },
    addPetsText: {
        fontSize: 20
    },
    addIconContainer: {
        borderWidth: 1.5,
        borderColor: "#225560",
        borderRadius: 100,
        padding: 3
    }
});

export default style