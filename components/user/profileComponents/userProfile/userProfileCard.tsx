import { View, Text } from "react-native";
import React from "react";
import style from "./userProfileCardStyleSheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";

interface userProfileCardProps {
  name: string | undefined;
  email: string | undefined;
  cellNumber: string | undefined;
}

const UserProfileCard = ({ name, email, cellNumber }: userProfileCardProps) => {
  return (
    <LinearGradient
      colors={["white", "white"]}
      start={[0.5, 0.1]}
      locations={[0, 0.7]}
      style={style.mainContainer}
    >
      <View style={style.nameContainer}>
        <Text style={style.nameText}>{name}</Text>
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
    </LinearGradient>
  );
};

export default UserProfileCard;
