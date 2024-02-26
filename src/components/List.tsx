import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ListItem from './ListItem';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import { verticalScale } from '../helpers/scaleHelpers';
import { ItemWithId } from '../screens/Main';

const List = () => {
  const { shoppingList } = React.useContext(MainContext);
  const { bottom } = useSafeAreaInsets();
  const flatListRef = React.useRef<FlatList<ItemWithId>>(null);
  const scrollToTop = () => {
    flatListRef.current?.scrollToIndex({ index: 0, animated: true });
  };
  const scrollToItem = (item: ItemWithId) => {
    flatListRef.current?.scrollToItem({ item, animated: true });
  };
  return (
    <FlatList
      ref={flatListRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.contentContainerStyle,
        {
          paddingBottom: bottom + verticalScale(theme.spacing.spacing_512),
        },
      ]}
      data={shoppingList}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          scrollToTop={scrollToTop}
          scrollToItem={scrollToItem}
        />
      )}
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
