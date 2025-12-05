import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import UserProfileCard from "../../components/user/profileScreenComponents/userProfile/userProfileCard";
import PetProfileCard from "../../components/user/profileScreenComponents/petProfile/petProfileCard";
import { useUserStore } from "../../hooks/UserStore";
import style from "../../pageStyleSheets/profileStyleSheet";
import { formatCellphoneNumber } from "../../utils/formatCellphoneNumber";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NoPetsAdded from "../../components/user/profileScreenComponents/petProfile/noPetsAdded";
import { Link } from "expo-router";
import { usePetStore } from "../../hooks/petStore";
import { useGetPetsQuery } from "../services/pet/petSlice";

const Profile = () => {
  const { user } = useUserStore();
  const userFirstName = user?.firstName;
  const userEmailAddress = user?.email;
  const userCellphoneNumber = user?.cellNumber;

  const { data: fetchedPets, refetch, isLoading, error } = useGetPetsQuery();
  const { pets, setPets } = usePetStore();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (fetchedPets) {
      setPets(fetchedPets);
      console.log("Fetched pets:", fetchedPets);
    }
  }, [fetchedPets]);

  return (
    <ScrollView style={style.mainContainer}>
      <View>
        <UserProfileCard
          name={userFirstName}
          email={userEmailAddress}
          cellNumber={formatCellphoneNumber(userCellphoneNumber)}
        />
        <View style={style.addPetsContainer}>
          <Text style={style.addPetsText}>My Pets</Text>
          <Link style={style.addIconContainer} href="/addAPetForm">
            <MaterialIcons name="add" size={24} color="#225560" />
          </Link>
        </View>

        {pets.length === 0 ? (
          <NoPetsAdded />
        ) : (
          pets.map((pet) => (
            <TouchableOpacity
              key={pet.name}
              onPress={() => console.log("Pet clicked")}
            >
              <PetProfileCard key={pet.name} pet={pet} />
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;
