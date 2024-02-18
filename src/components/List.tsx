import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import AppButton from './AppButton';
import ListItem from './ListItem';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import { verticalScale } from '../helpers/scaleHelpers';

const List = () => {
  const { shoppingList, openAddModal } = React.useContext(MainContext);
  const shoppingListWithAddButton = [
    ...shoppingList,
    { id: 'addButton', content: '', checked: false },
  ];
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      data={shoppingListWithAddButton}
      renderItem={({ item }) => {
        if (item.id === 'addButton')
          return (
            <AppButton
              text=""
              style={styles.addButton}
              onPress={openAddModal}
            />
          );
        return <ListItem item={item} />;
      }}
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
  },
});
