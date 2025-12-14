import { useState } from "react";
import { TouchableOpacity, View, Alert } from "react-native";
import { Menu } from "react-native-paper";
import { useServicesStore } from "../../hooks/serviceStore";
import { Feather } from "@expo/vector-icons";
import style from "./serviceOfferingMenuStyleSheet";
import { useDeleteServiceOfferingMutation } from "../../app/services/packages/serviceOfferingsSlice";
import { ServiceOffering } from "../../app/models/serviceOffering";

const ServiceOfferingMenu = ({ service }: { service: ServiceOffering }) => {
  const { setSelectedService } = useServicesStore();
  const [visible, setVisible] = useState(false);
  const [deleteServiceOffering, { isLoading }] =
    useDeleteServiceOfferingMutation();

  const openMenu = () => {
    setSelectedService(service);
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);

  const handleSelectedService = () => {
    console.log("Selected Service in Menu:", service);
  };

  const handleDeleteService = async () => {
    if (!service?.id) return;
    try {
      await deleteServiceOffering(service.id).unwrap();
      console.log("Deleted service", service.id);
    } catch (error) {
      console.error("Failed to delete the service: ", error);
    }
  };

  const showConfirmationAlert = () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete ${service.name}?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            handleDeleteService();
            closeMenu();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={style.mainContainer}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Feather name="more-vertical" size={24} color="black" />
          </TouchableOpacity>
        }
        contentStyle={style.menuContent}
      >
        <Menu.Item onPress={handleSelectedService} title="Edit" />
        <Menu.Item
          onPress={() => {
            showConfirmationAlert();
            closeMenu();
          }}
          title="Delete"
        />
      </Menu>
    </View>
  );
};

export default ServiceOfferingMenu;
