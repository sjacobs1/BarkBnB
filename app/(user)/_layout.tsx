import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function UserTabsLayout() {
  return (
    <BottomSheetModalProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Services",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="dog-service"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="booking"
          options={{
            title: "Bookings",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </BottomSheetModalProvider>
  );
}
