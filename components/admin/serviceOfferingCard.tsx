import { View, Text } from "react-native";
import React from "react";
import { useServicesStore } from "../../hooks/serviceStore";

interface ServiceOfferingCardProps {
  service: {
    name: string;
    description?: string;
    price?: number;
  };
}

const serviceOfferingCard = ({ service }: ServiceOfferingCardProps) => {
  const { setSelectedService } = useServicesStore();
  const handleSelectedService = () => {
    setSelectedService(service);
  };

  return (
    <View>
      <Text>{service.name}</Text>
    </View>
  );
};

export default serviceOfferingCard;
