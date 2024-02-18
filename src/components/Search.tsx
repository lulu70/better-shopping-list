import React from 'react';
import {
  FlatList,
  Keyboard,
  LayoutAnimation,
  StyleSheet,
  View,
} from 'react-native';

import AppButton from './AppButton';
import AppTextInput from './AppTextInput';
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

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
        rightIcon={isSearching && inputValue.length > 0 ? 'X' : '🔍'}
        onRightIconPress={handleRightIconPress}
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
        keyboardShouldPersistTaps="always"
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
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
