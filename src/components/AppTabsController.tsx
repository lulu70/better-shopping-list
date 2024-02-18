import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from '../constants/theme';
import { verticalScale } from '../helpers/scaleHelpers';

const AppTabsController = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <Text>AppTabsController</Text>
    </View>
  );
};

export default AppTabsController;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: 'red',
    paddingVertical: verticalScale(theme.spacing.spacing_10),
  },
});
