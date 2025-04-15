import { View, Text } from 'react-native'
import React from 'react'
import s from '../../../../../pageStyleSheets/petFullProfilePageStyleSheet'

interface RowCellProps {
  label: string
  value: string
}

const RowCell = ({label, value}: RowCellProps) => {
  return (
    <View style={s.rowCell}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  )
}

export default RowCell