import { View, Text, Button, ScrollView, Dimensions } from "react-native";
import { useServicesStore } from "../../hooks/serviceStore";
import { useGetServiceOfferingsQuery } from "../services/packages/serviceOfferingsSlice";
import React, { useEffect } from "react";
import style from "../../pageStyleSheets/userHomeStyleSheet";
import UserServiceOfferingCard from "../../components/user/userComponents/userServiceOfferingCard";
import { SafeAreaView } from "react-native-safe-area-context";

const UserHome = () => {
  const services = useServicesStore((state) => state.serviceOfferings);
  const {
    data: fetchedServices,
    refetch,
    isLoading,
    error,
  } = useGetServiceOfferingsQuery();

  const setServices = useServicesStore((state) => state.setServices);
  console.log("Fetched Services:", services);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (fetchedServices) {
      setServices(fetchedServices);
    }
  }, [fetchedServices]);
  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error loading services</Text>
      ) : (
        services.map((service) => (
          <UserServiceOfferingCard key={service.name} service={service} />
        ))
      )}
    </ScrollView>
  );
};

export default UserHome;
