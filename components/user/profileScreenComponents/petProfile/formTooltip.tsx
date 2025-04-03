import { View, Text } from "react-native";
import React from "react";
import { Tooltip } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface FormTooltipProps {
  title: string;
}

const FormTooltip = ({ title }: FormTooltipProps) => {
  return (
    <View style={{ marginLeft: 10 }}>
      <Tooltip title={title} enterTouchDelay={10} leaveTouchDelay={3000}>
        <FontAwesome name="question-circle-o" size={20} color="#1c7fff" />
      </Tooltip>
    </View>
  );
};

export default FormTooltip;
