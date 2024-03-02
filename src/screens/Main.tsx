import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Keyboard, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AddModal from '../components/AddModal';
import AppTabsController from '../components/AppTabsController';
import List from '../components/List';
import Search from '../components/Search';
import theme from '../constants/theme';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';

export interface Item {
  content: string;
  checked: boolean;
  updatedAt: number;
}
export interface ItemWithId extends Item {
  id: string | null;
}

const Main = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.innerContainer} onPress={Keyboard.dismiss}>
        <StatusBar style="auto" />
        <View style={styles.headerContainer}>
          <Search />
        </View>
        <List />
      </Pressable>
      <AppTabsController />
      <AddModal />
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  innerContainer: {
    flexShrink: 1,
    paddingHorizontal: horizontalScale(theme.spacing.spacing_20),
  },
  headerContainer: {
    flexDirection: 'row',
    gap: horizontalScale(theme.spacing.spacing_12),
    marginTop: verticalScale(theme.spacing.spacing_12),
  },
  addButtonText: {
    fontSize: horizontalScale(theme.fontSize.fontSize_32),
    fontWeight: theme.fontWeight.bold,
  },
});
