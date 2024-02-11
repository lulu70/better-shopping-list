import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from './ListItem';
import { type ItemWithId } from '../App';
import theme from '../constants/theme';
import { verticalScale } from '../helpers/scaleHelpers';

interface Props {
  shoppingList: ItemWithId[];
}

const List = ({ shoppingList }: Props) => {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={shoppingList}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item, index) => item.id || index.toString()}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(theme.spacing.spacing_10),
  },
});
