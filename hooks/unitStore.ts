import { create } from "zustand";
import { Unit } from "../app/models/unit";

interface UnitStore {
  units: Unit[];
  addUnit: (unit: Unit) => void;
  setUnits: (units: Unit[]) => void;
  selectedUnit: Unit | null;
  setSelectedUnit: (unit: Unit | null) => void;
}

export const useUnitStore = create<UnitStore>((set) => ({
  units: [],
  addUnit: (unit: Unit) => set((state) => ({ units: [...state.units, unit] })),
  setUnits: (units: Unit[]) => set(() => ({ units })),
  selectedUnit: null,
  setSelectedUnit: (unit) => set({ selectedUnit: unit }),
}));
