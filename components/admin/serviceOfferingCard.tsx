import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useServicesStore } from "../../hooks/serviceStore";
import style from "./serviceOfferingsCardStyleSheet";

interface ServiceOfferingCardProps {
  service: {
    name: string;
    description?: string;
    price?: number;
  };
}

const ServiceOfferingCard = ({ service }: ServiceOfferingCardProps) => {
  const { setSelectedService } = useServicesStore();
  const handleSelectedService = () => {
    setSelectedService(service);
  };
  const maxLines = 3;

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={style.mainContainer}>
      <Text>{service.name}</Text>
      <Text
        numberOfLines={expanded ? undefined : maxLines}
        ellipsizeMode="tail"
      >
        {service.description}{" "}
        <TouchableOpacity onPress={toggleExpanded}>
          {" "}
          <Text style={style.readMoreButton}>
            {expanded ? "Read less" : "Read more"}
          </Text>
        </TouchableOpacity>
      </Text>
      <Text>{service.price}</Text>
    </View>
  );
};

export default ServiceOfferingCard;
