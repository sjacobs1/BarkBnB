import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import style from "./userProfileCardStyleSheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useRouter } from "expo-router";
import { useAuth } from "../../../../AuthProvider";
import { useUserStore } from "../../../../hooks/UserStore";

interface userProfileCardProps {
  name: string | undefined;
  email: string | undefined;
  cellNumber: string | undefined;
}

const UserProfileCard = ({ name, email, cellNumber }: userProfileCardProps) => {
  const { logout } = useAuth();
  const { user } = useUserStore();
  console.log("Role:", user?.role);
  const router = useRouter();

  const navigateLogin = () => {
    router.push("/(auth)/login");
  };

  const userSignOut = async () => {
    await logout();
    navigateLogin();
  };

  return (
    <View style={style.mainContainer}>
      <View style={style.nameAndEditContainer}>
        <View style={style.editIconContainer}>
          <MaterialIcons name="edit" size={24} color="#A4D4DF" />
        </View>
        <View style={style.nameContainer}>
          <Text style={style.nameText}>{name}</Text>
        </View>
      </View>

      <View style={style.detailsGroupContainer}>
        <View style={style.detailsContainer}>
          <View style={style.iconContainer}>
            <MaterialIcons name="email" size={24} color="#FFA025" />
          </View>
          <Text style={style.userContactText}>{email}</Text>
        </View>
        <View style={style.detailsContainer}>
          <View style={style.iconContainer}>
            <MaterialIcons name="local-phone" size={24} color="#FFA025" />
          </View>
          <Text style={style.userContactText}>{cellNumber}</Text>
        </View>
      </View>

      <View style={style.logoutContainer}>
        <TouchableOpacity style={style.logoutButton} onPress={userSignOut}>
          <Text style={style.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfileCard;
