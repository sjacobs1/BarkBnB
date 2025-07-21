import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import style from "../../pageStyleSheets/bookingsStyleSheet";

const Booking = () => {
  return (
    <>
      <ScrollView>
        <View>
          <Text>Ongoing Bookings</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={style.addBookingButton} onPress={() => {}}>
        <Link href="/createBookingForm">
          <Ionicons name="add-outline" size={36} color="#FFA025" />
        </Link>
      </TouchableOpacity>
    </>
  );
};

export default Booking;
