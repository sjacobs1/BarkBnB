import { View, Text, Button } from "react-native";
import { useAuth } from "../../AuthProvider";
import { useRouter } from "expo-router";

const UserHome = () => {
  const { logout } = useAuth();
  console.log("Role:", useAuth().role);
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
      <Text>User Home Page</Text>
      <Button title="Logout" onPress={userSignOut} />
    </View>
  );
};

export default UserHome;
