import React from 'react';
import { FlatList, Keyboard, StyleSheet, Text, View } from 'react-native';

import AppButton from './AppButton';
import AppTextInput from './AppTextInput';
import AddIcon from '../Icons/AddIcons';
import CloseIcon from '../Icons/CloseIcon';
import SearchIcon from '../Icons/SearchIcon';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import SearchContext from '../context/SearchContext/SearchContext';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';
import { ItemWithId } from '../screens/Main';

const Search = () => {
  const { shoppingList, changeCheckedItem, addItem } =
    React.useContext(MainContext);
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

  const handleAddItemPress = () => {
    addItem(inputValue);
    changeIsSearching(false);
    resetSearchState();
  };

  return (
    <View style={styles.container}>
      <AppTextInput
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Search"
        onfocus={handleInputFocus}
        onBlur={handleInputBlur}
        rightIcon={isSearching && inputValue.length > 0 && <CloseIcon />}
        leftIcon={<SearchIcon />}
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
              textStyle={styles.searchItemText}
              onPress={() => {
                handleSearchItemPress(item);
              }}
            />
          )}
          keyExtractor={(item, index) => item.id || index.toString()}
          keyboardShouldPersistTaps="always"
        />
      )}
      {searchResults.length === 0 && inputValue.length > 0 && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.searchItemText}>No results found for: </Text>
          <Text style={[styles.searchItemText, styles.noResultsValue]}>
            {inputValue}
          </Text>
          <AppButton style={styles.addButton} onPress={handleAddItemPress}>
            <AddIcon />
            <Text>Add it now</Text>
          </AppButton>
        </View>
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
    backgroundColor: theme.colors.background,
    // vertical scale doesn't work here
    paddingVertical: horizontalScale(theme.spacing.spacing_20),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchItemText: {
    fontSize: horizontalScale(theme.fontSize.fontSize_18),
    lineHeight: verticalScale(theme.fontSize.fontSize_20),
  },
  noResultsContainer: {
    paddingTop: verticalScale(theme.spacing.spacing_20),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    alignItems: 'center',
  },
  noResultsValue: {
    fontWeight: theme.fontWeight.bold,
    marginTop: verticalScale(theme.spacing.spacing_10),
  },
  addButton: {
    paddingVertical: verticalScale(theme.spacing.spacing_20),
    alignItems: 'center',
  },
});
