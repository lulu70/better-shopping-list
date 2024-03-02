import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from './AppButton';
import AddIcon from '../Icons/AddIcons';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import SearchContext from '../context/SearchContext/SearchContext';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';

const AppTabsController = () => {
  const { bottom } = useSafeAreaInsets();
  const { openAddModal } = React.useContext(MainContext);
  const { isSearching } = React.useContext(SearchContext);

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: bottom + verticalScale(theme.spacing.spacing_12) },
      ]}
    >
      <AppButton
        onPress={openAddModal}
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
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(theme.spacing.spacing_48),
    height: horizontalScale(theme.spacing.spacing_48),
  },
});
