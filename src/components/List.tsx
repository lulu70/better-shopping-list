import React from 'react';
import {
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from './AppButton';
import ListItem from './ListItem';
import ScrollUpIcon from '../Icons/ScrollUpIcon';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import { verticalScale } from '../helpers/scaleHelpers';
import { ItemWithId } from '../screens/Main';

const List = () => {
  const { shoppingList } = React.useContext(MainContext);
  const { bottom } = useSafeAreaInsets();
  const flatListRef = React.useRef<FlatList<ItemWithId>>(null);
  const [thereAreHiddenItems, setThereAreHiddenItems] = React.useState(false);
  const scrollToItem = (item: ItemWithId) => {
    flatListRef.current?.scrollToItem({ item, animated: true });
  };
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (shoppingList.length > viewableItems.length) {
      setThereAreHiddenItems(true);
    } else {
      setThereAreHiddenItems(false);
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
      contentContainerStyle={styles.contentContainerStyle}
      data={shoppingList}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          scrollToItem={scrollToItem}
          thereAreHiddenItems={thereAreHiddenItems}
        />
      )}
      ListFooterComponent={
        <AppButton
          style={{
            height: bottom + verticalScale(theme.spacing.spacing_512),
          }}
          pressedOpacity={1}
        >
          {thereAreHiddenItems && (
            <AppButton
              onPress={() => {
                flatListRef.current?.scrollToIndex({
                  index: 0,
                  animated: true,
                });
              }}
              style={styles.scrollUpButton}
            >
              <ScrollUpIcon />
              <Text>scroll up</Text>
            </AppButton>
          )}
        </AppButton>
      }
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
  scrollUpButton: {
    alignItems: 'center',
    marginTop: verticalScale(theme.spacing.spacing_64),
  },
});
