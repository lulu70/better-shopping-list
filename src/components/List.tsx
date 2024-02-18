import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ListItem from './ListItem';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import { verticalScale } from '../helpers/scaleHelpers';

const List = () => {
  const { shoppingList } = React.useContext(MainContext);
  const { bottom } = useSafeAreaInsets();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.contentContainerStyle,
        { paddingBottom: bottom + verticalScale(theme.spacing.spacing_96) },
      ]}
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
    minHeight: '100%',
  },
});
