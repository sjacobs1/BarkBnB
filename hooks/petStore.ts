import { create } from "zustand";

interface Pet {
  name: string;
  image?: string;
  breed?: string;
  gender?: string;
  birthdate?: Date;
  vaccine_status?: string;
  neutered?: boolean;
  dietary_requirements?: string;
  medical_requirements?: string;
}

interface PetStore {
  pets: Pet[];
  addPet: (pet: Pet) => void;
  setPets: (pets: Pet[]) => void;
  selectedPet: Pet | null;
  setSelectedPet: (pet: Pet | null) => void;
}

export const usePetStore = create<PetStore>((set) => ({
  pets: [],
  addPet: (pet: Pet) => set((state) => ({ pets: [...state.pets, pet] })),
  setPets: (pets: Pet[]) => set(() => ({ pets })),
  selectedPet: null,
  setSelectedPet: (pet) => set({ selectedPet: pet }),
}));
