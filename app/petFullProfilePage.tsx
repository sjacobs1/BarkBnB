import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { usePetStore } from "../hooks/petStore";
import { getAge } from "../utils/getPetAge";
import s from "../pageStyleSheets/petFullProfilePageStyleSheet";

const PetFullProfilePage = () => {
  const selectedPet = usePetStore((state) => state.selectedPet);
  const [requirementsExpanded, setRequirementsExpanded] = useState(false);

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

  const RowCell = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <View style={s.rowCell}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );

  const RequirementRow = ({
    label,
    value,
    showDivider
  }: {
    label: string;
    value: string;
    showDivider: boolean;
  }) => {
    const [expanded, setExpanded] = useState(false);
    const isExpandable = value?.toLowerCase() !== "no";

    return (
      <View style={[s.rowCell, { flexDirection: "column" }, !showDivider && { borderBottomWidth: 0 }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text>{label}</Text>
          {isExpandable ? (
            <Text
              style={{ color: "#1c7fff" }}
              onPress={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Hide details ▲" : "View details ▼"}
            </Text>
          ) : (
            <Text>no</Text>
          )}
        </View>

        {expanded && isExpandable && (
          <View style={s.dropdownBox}>
            <Text>{value}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={s.page}>
      <View style={s.mainContainer}>
        <View style={s.petImageContainer}>
          <Image source={{ uri: selectedPet.image }} style={s.petImage} />
          <Text style={s.petNameText}>{selectedPet.name}</Text>
        </View>
        {profileDetails.map((item, index) => (
          <RowCell
            key={index}
            label={item.label}
            value={item.value ?? ""}
          />
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
