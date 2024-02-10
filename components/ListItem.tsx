import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';
import theme from '../constants/theme';
import { type ItemWithId } from '../App';

interface Props {
  item: ItemWithId;
}

const ListItem = ({ item }: Props) => {
  return (
    <View style={styles.listItem} key={item.id}>
      <Text style={styles.checkedIcon}>{item.checked ? '✔️' : '◯'}</Text>
      <Text>{item.content}</Text>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    marginTop: verticalScale(theme.spacing.spacing_6),
  },
  checkedIcon: { marginRight: horizontalScale(theme.spacing.spacing_12) },
});
