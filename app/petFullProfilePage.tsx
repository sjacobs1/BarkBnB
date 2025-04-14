import { View, Text, Image } from 'react-native'
import React from 'react'
import { usePetStore } from '../hooks/petStore';
import {getAge} from '../utils/getPetAge';

const PetFullProfilePage = () => {
  const selectedPet = usePetStore((state) => state.selectedPet);

  if (!selectedPet) {
    return (
      <View>
        <Text>No pet selected.</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pet Full Profile Page</Text>
      <Image source={{ uri: selectedPet.image }} />
      <Text>{selectedPet.name}</Text>
      <Text>Breed: {selectedPet.breed}</Text>
      <Text>Gender: {selectedPet.gender}</Text>
      <Text>
        Birthdate:{" "}
        {selectedPet.birthdate
          ? `${getAge(selectedPet.birthdate!)?.years || 0} years, ${getAge(selectedPet.birthdate!)?.months || 0} months`
          : "Unknown"}
      </Text>
      <Text>Vaccinated: {selectedPet.vaccine_status}</Text>
      <Text>Neutered: {selectedPet.neutered ? "Yes" : "No"}</Text>
      <Text>Dietary Requirements: {selectedPet.dietary_requirements}</Text>
      <Text>Medical Requirements: {selectedPet.medical_requirements}</Text>
    </View>
  )
}

export default PetFullProfilePage
