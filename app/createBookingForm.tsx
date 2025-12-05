import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { usePetStore } from "../hooks/petStore";
import { Pet } from "./models/pet";
import { MultiSelect } from "react-native-element-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import style from "../pageStyleSheets/createBookingFormStyleSheet";

const CreateABooking = () => {
  const { pets, selectedPets, setSelectedPets } = usePetStore();
  const [selectedPetIds, setSelectedPetIds] = useState<string[] | undefined>(
    []
  );

  const [petServiceSelections, setPetServiceSelections] = useState<{
    [petKey: string]: { services: string[]; subtotal: number };
  }>({});
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);

  interface BookingFormValues {
    petId: string[];
    serviceOfferingId: string;
    unitId: string;
    startDate: string;
    endDate: string;
  }

  const handlePresentPets = () => {
    console.log("Selected Pets:", selectedPets);
  };

  const petOptions = pets.map((pet) => ({
    label: pet.name,
    value: pet.id,
  }));

  useEffect(() => {
    const selectedPetObjects = pets.filter(
      (pet) =>
        selectedPetIds &&
        pet.id !== undefined &&
        selectedPetIds.includes(pet.id as string)
    );
    setSelectedPets(selectedPetObjects);
  }, [selectedPetIds, pets, setSelectedPets]);

  const renderItem = (item: any) => {
    const isSelected = selectedPetIds?.includes(item.value);
    return (
      <View style={[style.item, isSelected && style.selectedItemBackground]}>
        <Text style={style.selectedTextStyle}>{item.label}</Text>
        <View style={style.selectedPetIconStyle}>
          {isSelected && (
            <FontAwesome6
              name="check"
              size={24}
              color="green"
              style={{ marginLeft: 8 }}
            />
          )}
          <MaterialIcons name="pets" size={20} color="black" />
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={style.scrollView}>
      <MultiSelect
        style={style.dropdown}
        data={petOptions}
        labelField="label"
        valueField="value"
        placeholder=" Select Pets"
        placeholderStyle={style.placeholderStyle}
        value={selectedPetIds}
        onChange={setSelectedPetIds}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={style.selectedStyle}>
              <Text style={style.textSelectedStyle}>{item.label}</Text>
              <Ionicons name="remove-circle-outline" size={16} color="black" />
            </View>
          </TouchableOpacity>
        )}
        renderItem={renderItem}
        renderLeftIcon={() => (
          <MaterialIcons name="pets" size={20} color="black" />
        )}
        iconStyle={style.iconStyle}
      />

      {/* <TouchableOpacity onPress={handlePresentPets}>
        <Text>Get pets</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default CreateABooking;
