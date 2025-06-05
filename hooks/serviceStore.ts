import { create } from "zustand";

interface Service {
  name: string;
  description?: string;
  price?: number;
}

interface ServiceStore {
  serviceOfferings: Service[];
  addService: (service: Service) => void;
  setServices: (service: Service[]) => void;
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
}

export const useServicesStore = create<ServiceStore>((set) => ({
  serviceOfferings: [],
  addService: (service: Service) =>
    set((state) => ({
      serviceOfferings: [...state.serviceOfferings, service],
    })),
  setServices: (services: Service[]) =>
    set(() => ({ serviceOfferings: services })),
  selectedService: null,
  setSelectedService: (service) => set({ selectedService: service }),
}));
