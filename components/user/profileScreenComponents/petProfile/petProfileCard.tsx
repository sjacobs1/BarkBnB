import { View, Text, Image } from "react-native";
import React from "react";
import style from "./petProfileCardStyleSheet";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";

interface PetProfileCardProps {
  name: string | undefined;
  image: string | undefined;
  checkedIn: boolean | undefined;
}

const PetProfileCard = ({ name, image, checkedIn }: PetProfileCardProps) => {
  return (
    <Link style={style.mainContainer} href="../../../petFullProfilePage"><View style={style.mainContainer}>
      <View style={style.petImageContainer}>
        <Image source={{ uri: image }} style={style.petImage} />
      </View>
      <View style={style.petNameContainer}>
        <Text style={style.petNameText}>{name}</Text>
      </View>
      <View style={style.checkedInStatusContainer}>
        <MaterialCommunityIcons
          name={checkedIn ? 'paw' : 'paw-off-outline'}
          size={24}
          color={checkedIn ? "green" : "#D6D6D6"}
        />
        <Text>{checkedIn ? "checked in" : "at home"}</Text>
      </View>
    </View></Link>
  );
};

export default PetProfileCard;
