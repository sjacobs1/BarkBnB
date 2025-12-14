import { Text, Image, View, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import style from "./serviceDetailsPageStyleSheet";
import { useServicesStore } from "../../../hooks/serviceStore";
import { Divider } from "react-native-paper";

const ServiceDetailsSheet = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const { selectedService } = useServicesStore();
  if (!selectedService) return null;

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={style.mainContainer}>
        <Text style={style.serviceName}>{selectedService?.name}</Text>
        <View style={style.imageContainer}>
          {imageLoading && (
            <ActivityIndicator
              size="large"
              color="#225560"
              style={style.loadingIndicator}
            />
          )}
          <Image
            source={{
              uri: selectedService.image_url || "assets/logo.svg",
            }}
            style={style.servicePoster}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
        </View>
        <Text style={style.servicePrice}>R{selectedService?.price}</Text>
        <Divider style={style.divider} />
        <Text style={style.serviceDescription}>
          {selectedService?.description?.replace(/\\n/g, "\n")}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ServiceDetailsSheet;
