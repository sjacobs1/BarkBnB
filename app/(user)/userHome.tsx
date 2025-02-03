import { View, Text, Button } from "react-native";
import { useAuth } from "../../AuthProvider";

const UserHome = () => {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>User Home Page</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default UserHome;
