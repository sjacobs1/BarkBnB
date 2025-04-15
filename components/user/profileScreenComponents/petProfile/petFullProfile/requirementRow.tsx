import { View, Text, } from 'react-native'
import React, { useState } from 'react'
import s from '../../../../../pageStyleSheets/petFullProfilePageStyleSheet';

const RequirementRow = ({
    label,
    value,
    showDivider
  }: {
    label: string;
    value: string;
    showDivider: boolean;
  }) => {
    const [expanded, setExpanded] = useState(false);
    const isExpandable = value?.toLowerCase() !== "no";

    return (
      <View style={[s.rowCell, { flexDirection: "column" }, !showDivider && { borderBottomWidth: 0 }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text>{label}</Text>
          {isExpandable ? (
            <Text
              style={{ color: "#1c7fff" }}
              onPress={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Hide details ▲" : "View details ▼"}
            </Text>
          ) : (
            <Text>no</Text>
          )}
        </View>

        {expanded && isExpandable && (
          <View style={s.dropdownBox}>
            <Text>{value}</Text>
          </View>
        )}
      </View>
    );
  };

export default RequirementRow