import { View, Text, Button, ScrollView } from "react-native";
import { useServicesStore } from "../../hooks/serviceStore";
import { useGetServiceOfferingsQuery } from "../services/packages/serviceOfferingsSlice";
import { useEffect } from "react";
import style from "../../pageStyleSheets/userHomeStyleSheet";

const UserHome = () => {
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
    <ScrollView contentContainerStyle={style.scrollView}>
      <Text style={style.sectionHeader}>User Home Page</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error loading services</Text>
        ) : (
          services.map((service) => (
            <View key={service.name} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {service.name}
              </Text>
              <Text>Price: R{service.price}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default UserHome;
