import { View, Text } from "react-native";
import React from "react";
import Foundation from "@expo/vector-icons/Foundation";

const NoPetsAdded = () => {
  return (
    <View
      style={{
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Foundation name="no-dogs" size={70} color="gray" />
      <Text style={{ fontWeight: 200, textAlign: "center" }}>
        Oops! It looks like you haven't added any pets yet.{"\n"} Tap the " + "
        icon to create a profile {"\n"} for your furry firend ! 🐾
      </Text>
    </View>
  );
};

export default NoPetsAdded;
