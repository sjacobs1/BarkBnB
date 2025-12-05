import { useState } from "react";
import { View } from "react-native";
import { Menu } from "react-native-paper";
import { useServicesStore } from "../../hooks/serviceStore";

const ServiceOfferingMenu = () => {
  const { selectedService } = useServicesStore();

  return (
    <View style={{ flex: 1 }}>
      <Menu.Item onPress={() => {}} title="Edit" />
      <Menu.Item onPress={() => {}} title="Delete" />
    </View>
  );
};
