import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import AddModal from '../components/AddModal';
import AppButton from '../components/AppButton';
import List from '../components/List';
import Search from '../components/Search';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import SearchContext from '../context/SearchContext/SearchContext';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';

export interface Item {
  content: string;
  checked: boolean;
}
export interface ItemWithId extends Item {
  id: string | null;
}

const Main = () => {
  const { openAddModal } = React.useContext(MainContext);
  const { isSearching } = React.useContext(SearchContext);
  // clear async storage
  // React.useEffect(() => {
  //   clearAsyncStorage();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.innerContainer} onPress={Keyboard.dismiss}>
        <StatusBar style="auto" />
        <View style={styles.headerContainer}>
          <AppButton
            text="+"
            onPress={openAddModal}
            textStyle={styles.addButtonText}
            disabled={isSearching}
          />
          <Search />
        </View>
        <List />
        <AddModal />
      </Pressable>
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
