import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';
import theme from '../constants/theme';
import { type ItemWithId } from '../App';

interface Props {
  shoppingList: ItemWithId[];
}

const List = ({ shoppingList }: Props) => {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={shoppingList}
      renderItem={({ item }) => (
        <View style={styles.listItem} key={item.id}>
          <Text style={styles.checkedIcon}>{item.checked ? '✔️' : '◯'}</Text>
          <Text>{item.content}</Text>
        </View>
      )}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(theme.spacing.spacing_10),
  },
  listItem: {
    flexDirection: 'row',
    marginTop: verticalScale(theme.spacing.spacing_6),
  },
  checkedIcon: { marginRight: horizontalScale(theme.spacing.spacing_12) },
});
