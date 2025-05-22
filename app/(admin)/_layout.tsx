import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function AdminTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Admin Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="serviceOfferings"
        options={{
          title: "Service Offerings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="dog-service"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
