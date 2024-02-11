import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from './ListItem';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import { verticalScale } from '../helpers/scaleHelpers';

const List = () => {
  const { shoppingList } = React.useContext(MainContext);
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
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
