import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useServicesStore } from "../../../hooks/serviceStore";
import style from "./userServiceOfferingCardStyleSheet";
import { Divider } from "react-native-paper";

interface UserServiceOfferingCardProps {
  service: {
    name: string;
    description?: string;
    price?: number;
    image_url?: string | null;
  };
  onPress?: () => void;
}

const UserServiceOfferingCard = ({
  service,
  onPress,
}: UserServiceOfferingCardProps) => {
  return (
    <TouchableOpacity style={style.mainContainer} onPress={onPress}>
      <View style={style.headerContainer}>
        <Image
          source={
            service.image_url
              ? { uri: service.image_url }
              : require("../../../assets/icon.png")
          }
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
