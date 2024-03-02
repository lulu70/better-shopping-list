import React from 'react';
import { FlatList, StyleSheet, ViewToken } from 'react-native';
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
  const [isScrollingToItem, setIsScrollingToItem] = React.useState(false);
  const scrollToItem = (item: ItemWithId) => {
    flatListRef.current?.scrollToItem({ item, animated: true });
  };
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (shoppingList.length > viewableItems.length) {
      setIsScrollingToItem(true);
    } else {
      setIsScrollingToItem(false);
    }
  };
  return (
    <FlatList
      viewabilityConfig={{
        viewAreaCoveragePercentThreshold: 100,
      }}
      onViewableItemsChanged={onViewableItemsChanged}
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
          scrollToItem={scrollToItem}
          isScrollingToItem={isScrollingToItem}
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
