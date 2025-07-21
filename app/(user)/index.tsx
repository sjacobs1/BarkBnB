import { View, Text, Button, ScrollView, Dimensions } from "react-native";
import { useServicesStore } from "../../hooks/serviceStore";
import { useGetServiceOfferingsQuery } from "../services/packages/serviceOfferingsSlice";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import style from "../../pageStyleSheets/userHomeStyleSheet";
import UserServiceOfferingCard from "../../components/user/userComponents/userServiceOfferingCard";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ServiceDetailsSheet from "../../components/user/userComponents/serviceDetailsPage";

const UserHome = () => {
  // const services = useServicesStore((state) => state.serviceOfferings);
  const { serviceOfferings, setServices } = useServicesStore();
  const {
    data: fetchedServices,
    refetch,
    isLoading,
    error,
  } = useGetServiceOfferingsQuery();

  // const setServices = useServicesStore((state) => state.setServices);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (fetchedServices) {
      setServices(fetchedServices);
    }
  }, [fetchedServices]);

  const { setSelectedService, selectedService } = useServicesStore();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const handleCardPress = (service) => {
    console.log("Card Pressed:", service);
    setSelectedService(service);
    bottomSheetModalRef.current?.present();
  };

  return (
    <>
      <SafeAreaProvider>
        <ScrollView contentContainerStyle={style.scrollView}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error loading services</Text>
          ) : (
            <View style={style.mainContainer}>
              {serviceOfferings.map((service) => (
                <UserServiceOfferingCard
                  key={service.name}
                  service={service}
                  onPress={() => handleCardPress(service)}
                />
              ))}
            </View>
          )}
        </ScrollView>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          enablePanDownToClose
          onDismiss={() => setSelectedService(null)}
          backdropComponent={({ style }) => (
            <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]} />
          )}
        >
          <BottomSheetView style={{ flex: 1 }}>
            {selectedService && <ServiceDetailsSheet />}
          </BottomSheetView>
        </BottomSheetModal>
      </SafeAreaProvider>
    </>
  );
};

export default UserHome;
