import { create } from "zustand";
import { ServiceOffering } from "../app/models/serviceOffering";

// interface Service {
//   id?: string;
//   name: string;
//   description?: string;
//   price?: number;
//   image_url?: string | null;
// }

interface ServiceStore {
  serviceOfferings: ServiceOffering[];
  addService: (service: ServiceOffering) => void;
  setServices: (service: ServiceOffering[]) => void;
  selectedService: ServiceOffering | null;
  setSelectedService: (service: ServiceOffering | null) => void;
}

export const useServicesStore = create<ServiceStore>((set) => ({
  serviceOfferings: [],
  addService: (service: ServiceOffering) =>
    set((state) => ({
      serviceOfferings: [...state.serviceOfferings, service],
    })),
  setServices: (services: ServiceOffering[]) =>
    set(() => ({ serviceOfferings: services })),
  selectedService: null,
  setSelectedService: (service) => set({ selectedService: service }),
}));
