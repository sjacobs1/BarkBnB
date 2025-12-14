import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useServicesStore } from "../../../hooks/serviceStore";
import style from "./userServiceOfferingCardStyleSheet";
import { Divider } from "react-native-paper";
import { ServiceOffering } from "../../../app/models/serviceOffering";

interface UserServiceOfferingCardProps {
  service: ServiceOffering;
  onPress?: () => void;
}

const UserServiceOfferingCard = ({
  service,
  onPress,
}: UserServiceOfferingCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <TouchableOpacity style={style.mainContainer} onPress={onPress}>
      <View style={style.headerContainer}>
        {imageLoading && (
          <ActivityIndicator
            size="large"
            color="#225560"
            style={style.loadingIndicator}
          />
        )}
        <Image
          source={
            service.image_url
              ? { uri: service.image_url }
              : require("../../../assets/icon.png")
          }
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
          style={style.servicePoster}
        />
      </View>
      <Divider style={style.divider} />
      <Text style={style.serviceName} numberOfLines={1}>
        {service.name}
      </Text>
    </TouchableOpacity>
  );
};

export default UserServiceOfferingCard;
