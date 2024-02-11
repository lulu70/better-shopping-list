import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from './AppButton';
import { type ItemWithId } from '../App';
import theme from '../constants/theme';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';

interface Props {
  item: ItemWithId;
  onCheckedPress: (id: string | null) => void;
  onDeletePress: (id: string | null) => void;
}

const ListItem = ({ item, onCheckedPress, onDeletePress }: Props) => {
  return (
    <View style={styles.listItem} key={item.id}>
      <AppButton
        onPress={() => {
          onCheckedPress(item.id);
        }}
        text={item.checked ? '✔️' : '◯'}
        textStyle={styles.checkedIcon}
      />
      <Text>{item.content}</Text>
      <AppButton
        text="🗑️"
        style={styles.trashIcon}
        onPress={() => {
          onDeletePress(item.id);
        }}
      />
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    marginTop: verticalScale(theme.spacing.spacing_12),
    paddingVertical: verticalScale(theme.spacing.spacing_8),
  },
  checkedIcon: { marginRight: horizontalScale(theme.spacing.spacing_12) },
  trashIcon: {
    marginLeft: 'auto',
  },
});
