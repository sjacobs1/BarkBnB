import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useServicesStore } from "../../hooks/serviceStore";
import style from "./serviceOfferingsCardStyleSheet";
import { Divider } from "react-native-paper";
import Feather from "@expo/vector-icons/Feather";
import ServiceOfferingMenu from "./serviceOfferingMenu";
import { ServiceOffering } from "../../app/models/serviceOffering";

interface ServiceOfferingCardProps {
  service: {
    id?: string;
    name: string;
    description?: string;
    price?: number;
    serviceImageUrl?: string | null;
  };
}

const ServiceOfferingCard = ({ service }: { service: ServiceOffering }) => {
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
        <TouchableOpacity>
          <ServiceOfferingMenu service={service} />
        </TouchableOpacity>
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
