import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useServicesStore } from "../../hooks/serviceStore";
import style from "./serviceOfferingsCardStyleSheet";
import { Divider } from "react-native-paper";
import Feather from "@expo/vector-icons/Feather";

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
  const maxLength = 150;

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const shouldShowReadMore =
    service.description && service.description.length > maxLength;

  return (
    <View style={style.mainContainer}>
      <View style={style.headerContainer}>
        <Text style={style.serviceName}>{service.name}</Text>
        <Feather name="more-vertical" size={24} color="black" />
        {/* <Text style={style.servicePrice}>{`R${service.price}`}</Text> */}
      </View>

      <Divider style={style.divider} />
      <View style={style.descriptionCntainer}>
        <Text
          numberOfLines={expanded ? undefined : maxLines}
          ellipsizeMode="tail"
        >
          {service.description}{" "}
        </Text>
        {shouldShowReadMore ? (
          <TouchableOpacity onPress={toggleExpanded}>
            <Text style={style.readMoreButton}>
              {expanded ? "Read less" : "Read more"}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ height: 20 }} />
        )}
      </View>
    </View>
  );
};

export default ServiceOfferingCard;
