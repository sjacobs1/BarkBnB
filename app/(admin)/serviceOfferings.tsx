import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useServicesStore } from "../../hooks/serviceStore";
import { useGetServiceOfferingsQuery } from "../services/packages/serviceOfferingsSlice";
import ServiceOfferingCard from "../../components/admin/serviceOfferingCard";
import style from "../../pageStyleSheets/serviceOfferingsStylesheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

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

      <TouchableOpacity style={style.addServiceButton} onPress={() => {}}>
        <Link href="/addAServiceForm">
          <Ionicons name="add-outline" size={36} color="#FFA025" />
        </Link>
      </TouchableOpacity>
    </View>
  );
};

export default Services;
