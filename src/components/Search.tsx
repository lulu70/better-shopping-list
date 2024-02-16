import React from 'react';
import { FlatList, LayoutAnimation, StyleSheet, View } from 'react-native';

import AppButton from './AppButton';
import AppTextInput from './AppTextInput';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';
import { ItemWithId } from '../screens/Main';

const Search = () => {
  const { shoppingList, changeCheckedItem } = React.useContext(MainContext);
  const [inputValue, setInputValue] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<ItemWithId[]>([]);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    const results = shoppingList.filter((item) => {
      if (text) {
        return item.content.toLowerCase().includes(text.toLowerCase());
      } else {
        return false;
      }
    });

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchResults(results);
  };

  const handleSearchItemPress = (item: ItemWithId) => {
    if (item.checked) {
      changeCheckedItem(item.id);
    }
    setSearchResults([]);
    setInputValue('');
  };

  return (
    <View>
      <AppTextInput
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Search"
      />
      <FlatList
        data={searchResults}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => (
          <AppButton
            text={item.content}
            style={styles.searchItem}
            onPress={() => {
              handleSearchItemPress(item);
            }}
          />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: theme.colors.background_secondary,
  },
  searchItem: {
    paddingHorizontal: horizontalScale(theme.spacing.spacing_8),
    paddingVertical: verticalScale(theme.spacing.spacing_10),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
});
