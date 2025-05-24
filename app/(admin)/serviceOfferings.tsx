import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useServicesStore } from "../../hooks/serviceStore";
import { useGetServiceOfferingsQuery } from "../services/packages/serviceOfferings";
import ServiceOfferingCard from "../../components/admin/serviceOfferingCard";
import style from "../../pageStyleSheets/serviceOfferingsStylesheet";

const Services = () => {
  const services = useServicesStore((state) => state.serviceOfferings);
  const {
    data: fetchedServices,
    refetch,
    isLoading,
    error,
  } = useGetServiceOfferingsQuery();
  console.log("Fetched Services:", fetchedServices);
  const setServices = useServicesStore((state) => state.setServices);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (fetchedServices) {
      setServices(fetchedServices);
    }
  }, [fetchedServices]);
  return (
    <View style={style.mainContainer}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error fetching services</Text>
      ) : (
        services.map((service) => (
          <ServiceOfferingCard key={service.name} service={service} />
        ))
      )}
    </View>
  );
};

export default Services;
