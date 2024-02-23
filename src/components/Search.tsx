import React from 'react';
import { FlatList, Keyboard, StyleSheet, View } from 'react-native';

import AppButton from './AppButton';
import AppTextInput from './AppTextInput';
import CloseIcon from '../Icons/CloseIcon';
import SearchIcon from '../Icons/SearchIcon';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import SearchContext from '../context/SearchContext/SearchContext';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';
import { ItemWithId } from '../screens/Main';

const Search = () => {
  const { shoppingList, changeCheckedItem } = React.useContext(MainContext);
  const { changeIsSearching, isSearching } = React.useContext(SearchContext);
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

    setSearchResults(results);
  };

  const resetSearchState = () => {
    setSearchResults([]);
    setInputValue('');
    Keyboard.dismiss();
  };
  const handleSearchItemPress = (item: ItemWithId) => {
    changeCheckedItem(item.id);
    resetSearchState();
  };

  const handleInputFocus = () => {
    changeIsSearching(true);
  };
  const handleInputBlur = () => {
    changeIsSearching(false);
    resetSearchState();
  };

  const handleRightIconPress = () => {
    if (isSearching && inputValue.length > 0) {
      resetSearchState();
    }
  };

  return (
    <View style={styles.container}>
      <AppTextInput
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Search"
        onfocus={handleInputFocus}
        onBlur={handleInputBlur}
        rightIcon={
          isSearching && inputValue.length > 0 ? <CloseIcon /> : <SearchIcon />
        }
        onRightIconPress={handleRightIconPress}
      />
      {searchResults.length > 0 && (
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
          keyboardShouldPersistTaps="always"
        />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainerStyle: {
    paddingBottom: verticalScale(theme.spacing.spacing_2048),
  },
  searchItem: {
    backgroundColor: theme.colors.background_secondary,
    paddingHorizontal: horizontalScale(theme.spacing.spacing_8),
    // vertical scale doesn't work here
    paddingVertical: horizontalScale(theme.spacing.spacing_20),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
});
