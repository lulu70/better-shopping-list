import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppButton from './AppButton';
import AddIcon from '../Icons/AddIcons';
import theme from '../constants/theme';
import SearchContext from '../context/SearchContext/SearchContext';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';

const AppTabsController = () => {
  const { isSearching, changeSearchIsFocused } =
    React.useContext(SearchContext);

  return (
    <View style={[styles.container]}>
      <AppButton
        onPress={() => changeSearchIsFocused(true)}
        disabled={isSearching}
        style={styles.button}
      >
        <AddIcon />
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
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: verticalScale(theme.spacing.spacing_60),
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
});
