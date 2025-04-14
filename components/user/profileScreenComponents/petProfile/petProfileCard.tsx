import { View, Text, Image } from "react-native";
import React from "react";
import style from "./petProfileCardStyleSheet";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import { usePetStore } from "../../../../hooks/petStore";

interface PetProfileCardProps {
  pet: {
    name: string;
    image?: string;
    checkedIn?: boolean;
    breed?: string;
    gender?: string;
    birthdate?: Date;
    vaccine_status?: string;
    neutered?: boolean;
    dietary_requirements?: string;
    medical_requirements?: string;
  };
}

const PetProfileCard = ({ pet }: PetProfileCardProps) => {
  const { setSelectedPet } = usePetStore();
  const handleSelectedPet = () => {
    setSelectedPet(pet);
  };
  return (
    <Link
      style={style.mainContainer}
      onPress={handleSelectedPet}
      href="../../../petFullProfilePage"
    >
      <View style={style.mainContainer}>
        <View style={style.petImageContainer}>
          <Image source={{ uri: pet.image }} style={style.petImage} />
        </View>
        <View style={style.petNameContainer}>
          <Text style={style.petNameText}>{pet.name}</Text>
        </View>
        <View style={style.checkedInStatusContainer}>
          <MaterialCommunityIcons
            name={pet.checkedIn ? "paw" : "paw-off-outline"}
            size={24}
            color={pet.checkedIn ? "green" : "#D6D6D6"}
          />
          <Text>{pet.checkedIn ? "checked in" : "at home"}</Text>
        </View>
      </View>
    </Link>
  );
};

export default PetProfileCard;
