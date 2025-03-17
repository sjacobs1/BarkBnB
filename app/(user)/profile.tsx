import { View, Text, ScrollView } from "react-native";
import React from "react";
import UserProfileCard from "../../components/user/profileComponents/userProfile/userProfileCard";
import PetProfileCard from "../../components/user/profileComponents/petProfile/petProfileCard";
import { useUserStore } from "../../hooks/UserStore";
import style from "../../pageStyleSheets/profileStyleSheet";
import { SafeAreaView } from "react-native-safe-area-context";
import {formatCellphoneNumber} from "../../utils/formatCellphoneNumber";

const Profile = () => {
  const userFirstName = useUserStore((state) => state.user?.firstName);
  const userEmailAddress = useUserStore((state) => state.user?.email);
  const userCellphoneNumber = useUserStore((state) => state.user?.cellNumber);

  return (
    <ScrollView style={style.mainContainer}>
      <View>
        <UserProfileCard name={userFirstName} email={userEmailAddress} cellNumber={formatCellphoneNumber(userCellphoneNumber)}/>
        {/* <PetProfileCard /> */}
      </View>
    </ScrollView>
  );
};

export default Profile;
