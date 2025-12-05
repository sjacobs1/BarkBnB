import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { usePetStore } from "../hooks/petStore";
import { getAge } from "../utils/getPetAge";
import s from "../pageStyleSheets/petFullProfilePageStyleSheet";
import RowCell from "../components/user/profileScreenComponents/petProfile/petFullProfile/rowCell";
import RequirementRow from "../components/user/profileScreenComponents/petProfile/petFullProfile/requirementRow";

const PetFullProfilePage = () => {
  const { selectedPet } = usePetStore();

  if (!selectedPet) {
    return (
      <View>
        <Text>No pet selected.</Text>
      </View>
    );
  }

  const profileDetails = [
    { label: "Breed", value: selectedPet.breed },
    { label: "Gender", value: selectedPet.gender },
    {
      label: "Age",
      value: selectedPet.birthdate
        ? `${getAge(selectedPet.birthdate)?.years || 0} years, ${
            getAge(selectedPet.birthdate)?.months || 0
          } months`
        : "Unknown",
    },
    { label: "Vaccinated", value: selectedPet.vaccine_status },
    {
      label: selectedPet.gender === "female" ? "Spayed" : "Neutered",
      value: selectedPet.neutered ? "yes" : "no",
    },
  ];

  return (
    <ScrollView style={s.page}>
      <View style={s.mainContainer}>
        <View style={s.petImageContainer}>
          <Image source={{ uri: selectedPet.image }} style={s.petImage} />
          <Text style={s.petNameText}>{selectedPet.name}</Text>
        </View>
        {profileDetails.map((item, index) => (
          <RowCell key={index} label={item.label} value={item.value ?? ""} />
        ))}

        <RequirementRow
          label="Dietary Requirements"
          value={selectedPet.dietary_requirements ?? ""}
          showDivider={true}
        />
        <RequirementRow
          label="Medical Requirements"
          value={selectedPet.medical_requirements ?? ""}
          showDivider={false}
        />
      </View>
    </ScrollView>
  );
};

export default PetFullProfilePage;
