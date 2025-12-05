import { create } from "zustand";
import { Pet } from "../app/models/pet";

interface PetStore {
  pets: Pet[];
  addPet: (pet: Pet) => void;
  setPets: (pets: Pet[]) => void;
  selectedPet: Pet | null;
  setSelectedPet: (pet: Pet | null) => void;
  selectedPets: Pet[];
  setSelectedPets: (pets: Pet[]) => void;
}

export const usePetStore = create<PetStore>((set) => ({
  pets: [],
  addPet: (pet: Pet) => set((state) => ({ pets: [...state.pets, pet] })),
  setPets: (pets: Pet[]) => set(() => ({ pets })),
  selectedPet: null,
  setSelectedPet: (pet) => set({ selectedPet: pet }),
  selectedPets: [],
  setSelectedPets: (pets) => set({ selectedPets: pets }),
}));
