import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppButton from './AppButton';
import AddIcon from '../Icons/AddIcons';
import SearchIcon from '../Icons/SearchIcon';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import SearchContext from '../context/SearchContext/SearchContext';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';

const AppTabsController = () => {
  const { isSearching, changeSearchIsFocused } =
    React.useContext(SearchContext);
  const { openAddModal, addModalIsOpen } = React.useContext(MainContext);

  return (
    <View style={[styles.container]}>
      <AppButton
        onPress={() => openAddModal()}
        disabled={addModalIsOpen}
        style={styles.button}
      >
        <AddIcon />
      </AppButton>
      <AppButton
        onPress={() => changeSearchIsFocused(true)}
        disabled={isSearching}
        style={styles.button}
      >
        <SearchIcon
          size={horizontalScale(theme.spacing.spacing_26)}
          strokeWidth={2.5}
        />
      </AppButton>
    </View>
  );
};

export default AppTabsController;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: verticalScale(theme.spacing.spacing_12),
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(theme.spacing.spacing_20),
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: verticalScale(theme.spacing.spacing_60),
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
});
