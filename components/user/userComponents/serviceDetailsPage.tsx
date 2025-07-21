import { Text, Image, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import style from "./serviceDetailsPageStyleSheet";
import { useServicesStore } from "../../../hooks/serviceStore";
import { Divider } from "react-native-paper";

const ServiceDetailsSheet = () => {
  const { selectedService } = useServicesStore();
  if (!selectedService) return null;

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={style.mainContainer}>
        <Text style={style.serviceName}>{selectedService?.name}</Text>
        <Text style={style.serviceDescription}>
          {selectedService?.description?.replace(/\\n/g, "\n")}
        </Text>

        <Image
          source={
            selectedService?.image_url
              ? { uri: selectedService?.image_url }
              : require("../../../assets/icon.png")
          }
          style={style.servicePoster}
        />
      </View>
    </ScrollView>
  );
};

export default ServiceDetailsSheet;
