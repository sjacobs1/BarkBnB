import {
  View,
  Text,
  Button,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import { useServicesStore } from "../../hooks/serviceStore";
import { useGetServiceOfferingsQuery } from "../services/packages/serviceOfferingsSlice";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import style from "../../pageStyleSheets/userHomeStyleSheet";
import UserServiceOfferingCard from "../../components/user/userComponents/userServiceOfferingCard";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import ServiceDetailsSheet from "../../components/user/userComponents/serviceDetailsPage";
import { ServiceOffering } from "../models/serviceOffering";

const UserHome = () => {
  const { serviceOfferings, setServices } = useServicesStore();
  const {
    data: fetchedServices,
    refetch,
    isLoading,
    error,
  } = useGetServiceOfferingsQuery();

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
  const snapPoints = useMemo(() => ["25%", "45%", "65%"], []);

  const handleCardPress = (service: ServiceOffering) => {
    console.log("Card Pressed:", service);
    setSelectedService(service);
    bottomSheetModalRef.current?.present();
  };

  const handleDismissPress = useCallback(() => {
    setSelectedService(null);
    bottomSheetModalRef.current?.dismiss();
  }, []);

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
          enableDynamicSizing={true}
          enablePanDownToClose
          onDismiss={handleDismissPress}
          backdropComponent={({ style }) => (
            <Pressable
              style={[
                style,
                { justifyContent: "center", alignItems: "center" },
              ]}
              onPress={handleDismissPress}
            >
              <View
                style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
              />
            </Pressable>
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
