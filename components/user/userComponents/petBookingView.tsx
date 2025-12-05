import React from "react";
import { View, Text } from "react-native";

// const PetBookingView = ({
//   pet,
//   selectedServices,
//   setSelectedServices,
//   subtotal,
//   allServices,
// }) => (
//   <View
//     style={{ marginVertical: 16, padding: 16, borderWidth: 1, borderRadius: 8 }}
//   >
//     <Text
//       style={{ fontWeight: "bold", fontSize: 18 }}
//     >{`Booking for ${pet.name}`}</Text>
//     {/* Render service selection UI here */}
//     {/* Example: */}
//     {allServices.map((service) => (
//       <View
//         key={service.id}
//         style={{ flexDirection: "row", alignItems: "center" }}
//       >
//         <Text>{service.name}</Text>
//         <input
//           type="checkbox"
//           checked={selectedServices.includes(service.id)}
//           onChange={() => {
//             if (selectedServices.includes(service.id)) {
//               setSelectedServices(
//                 selectedServices.filter((id) => id !== service.id)
//               );
//             } else {
//               setSelectedServices([...selectedServices, service.id]);
//             }
//           }}
//         />
//       </View>
//     ))}
//     <Text
//       style={{ color: "red", marginTop: 8 }}
//     >{`Total For ${pet.name}: R${subtotal}`}</Text>
//   </View>
// );

// export default PetBookingView;
