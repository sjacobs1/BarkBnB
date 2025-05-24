import { View, Text, Button } from "react-native";
import { useAuth } from "../../AuthProvider";
import { useRouter } from "expo-router";
import { useUserStore } from "../../hooks/UserStore";
import { useServicesStore } from "../../hooks/serviceStore";
import { useGetServiceOfferingsQuery } from "../services/packages/serviceOfferings";
import { useEffect } from "react";
import ServiceOfferingCard from "../../components/admin/serviceOfferingCard";

const AdminHome = () => {
  const { logout } = useAuth();
  const { user } = useUserStore();

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
    </View>
  );
};

export default AdminHome;
