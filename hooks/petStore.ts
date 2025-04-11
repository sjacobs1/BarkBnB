import { create } from "zustand";
import { Pet } from "../app/models/pet";
import { useGetPetsQuery } from "../app/services/pet/petSlice";

interface PetStore {
  pets: Pet[];
  addPet: (pet: Pet) => void;
  setPets: (pets: Pet[]) => void;
}

export const usePetStore = create<PetStore>((set) => ({
  pets: [],
  addPet: (pet: Pet) => set((state) => ({ pets: [...state.pets, pet] })),
  setPets: (pets: Pet[]) => set(() => ({ pets })),
}));
