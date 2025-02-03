import { View, Text, Button } from "react-native";
import { useAuth } from "../../AuthProvider";

const AdminHome = () => {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Admin Home Page</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default AdminHome;
