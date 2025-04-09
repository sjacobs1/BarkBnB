import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import UserProfileCard from "../../components/user/profileScreenComponents/userProfile/userProfileCard";
import PetProfileCard from "../../components/user/profileScreenComponents/petProfile/petProfileCard";
import { useUserStore } from "../../hooks/UserStore";
import style from "../../pageStyleSheets/profileStyleSheet";
import { formatCellphoneNumber } from "../../utils/formatCellphoneNumber";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NoPetsAdded from "../../components/user/profileScreenComponents/petProfile/noPetsAdded";
import { Link } from "expo-router";
import { useGetPetsQuery } from "../services/pet/petSlice";

const Profile = () => {
  const { data: userPets = [], isLoading, isError } = useGetPetsQuery();
  const pets = JSON.stringify(userPets);
  console.log("Pets data:", pets);

  const userFirstName = useUserStore((state) => state.user?.firstName);
  const userEmailAddress = useUserStore((state) => state.user?.email);
  const userCellphoneNumber = useUserStore((state) => state.user?.cellNumber);

  // ❗️IMPORTANT❗️
  // The below variables are mock " pet state " data, this will be replaced with the actual pet data
  // from pet store when created. Dummy data used for UI skeleton
  const isPetStoreEmpty = false;
  const petName1 = "Roman";
  const petName = "Bailey";
  const petImage = "https://example.com/path/to/pet/image.jpg";
  const checkedIn = true;

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

        {isPetStoreEmpty ? (
          <NoPetsAdded />
        ) : (
          <>
            {userPets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                onPress={() => console.log("Pet clicked")}
              >
                <PetProfileCard
                  name={pet.name}
                  image={pet.image}
                  checkedIn={checkedIn}
                />
              </TouchableOpacity>
            ))}
            {/* <PetProfileCard
              name={petName1}
              image={petImage}
              checkedIn={checkedIn}
            />
            <PetProfileCard
              name={petName}
              image={petImage}
              checkedIn={checkedIn}
            /> */}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;
