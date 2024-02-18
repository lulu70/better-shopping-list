import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import AppButton from './AppButton';
import ListItem from './ListItem';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import { verticalScale } from '../helpers/scaleHelpers';

const List = () => {
  const { shoppingList, openAddModal } = React.useContext(MainContext);
  return (
    <FlatList
      ListFooterComponent={
        <AppButton
          text="+"
          style={styles.addButton}
          textStyle={styles.addButtonText}
          onPress={openAddModal}
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      data={shoppingList}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item, index) => item.id || index.toString()}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  contentContainerStyle: {
    marginTop: verticalScale(theme.spacing.spacing_10),
    height: '100%',
  },
  addButton: {
    height: '100%',
    minHeight: verticalScale(theme.spacing.spacing_40),
  },
  addButtonText: {
    fontSize: theme.fontSize.fontSize_32,
    fontWeight: theme.fontWeight.bold,
  },
});
