import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

import AddModal from '../components/AddModal';
import AppButton from '../components/AppButton';
import List from '../components/List';
import Search from '../components/Search';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
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
  // clear async storage
  // React.useEffect(() => {
  //   clearAsyncStorage();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.innerContainer} onPress={Keyboard.dismiss}>
        <StatusBar style="auto" />
        <Text style={styles.header}>Better Shopping List</Text>
        <Search />
        <AppButton
          text="+"
          onPress={openAddModal}
          style={styles.addButton}
          textStyle={styles.addButtonText}
        />
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
  header: {
    fontSize: horizontalScale(theme.fontSize.fontSize_18),
    fontWeight: theme.fontWeight.bold,
    marginTop: verticalScale(theme.spacing.spacing_20),
    textAlign: 'center',
  },
  addButton: {
    alignSelf: 'flex-end',
  },
  addButtonText: {
    fontSize: horizontalScale(theme.fontSize.fontSize_32),
    fontWeight: theme.fontWeight.bold,
  },
});
