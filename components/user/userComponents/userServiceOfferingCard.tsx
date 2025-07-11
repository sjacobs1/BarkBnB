import { View, Text, Image } from "react-native";
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
}

const UserServiceOfferingCard = ({ service }: UserServiceOfferingCardProps) => {
  const { setSelectedService } = useServicesStore();
  const handleSelectedService = () => {
    setSelectedService(service);
  };
  return (
    <View style={style.mainContainer}>
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
      <Text style={style.serviceName}>{service.name}</Text>
    </View>
  );
};

export default UserServiceOfferingCard;
