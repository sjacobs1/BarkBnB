import { View, Text, Button } from "react-native";
import { useAuth } from "../../AuthProvider";
import { useRouter } from "expo-router";
import { useUserStore } from "../../hooks/UserStore";
import { useServicesStore } from "../../hooks/serviceStore";
import { useGetServiceOfferingsQuery } from "../services/packages/serviceOfferings";
import { useEffect } from "react";

const AdminHome = () => {
  const { logout } = useAuth();
  const { user } = useUserStore();
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

  console.log("User:", user);
  const router = useRouter();

  const navigateLogin = () => {
    router.push("/(auth)/login");
  };

  const userSignOut = async () => {
    await logout();
    navigateLogin();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Admin Home Page</Text>
      <Button title="Logout" onPress={userSignOut} />
      <View>
        <Text>Service Offerings:</Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error fetching services</Text>
        ) : (
          services.map((service) => (
            <View key={service.name}>
              <Text>{service.name}</Text>
              <Text>{service.description}</Text>
              <Text>{service.price}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default AdminHome;
