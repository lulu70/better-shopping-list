import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import AddModal from './components/AddModal';
import AppButton from './components/AppButton';
import List from './components/List';
import theme from './constants/theme';
import {
  getDataFromAsyncStorage,
  storeDataInAsyncStorage,
} from './helpers/asyncStorageHelpers';
import { horizontalScale, verticalScale } from './helpers/scaleHelpers';

export interface Item {
  content: string;
  checked: boolean;
}
export interface ItemWithId extends Item {
  id: string | null;
}

export default function App() {
  const [shoppingList, setShoppingList] = React.useState<ItemWithId[]>([]);
  const [addModalIsOpen, setAddModalIsOpen] = React.useState(false);
  React.useEffect(() => {
    const getShoppingList = async () => {
      const getDataResponse = await getDataFromAsyncStorage({
        key: 'shoppingList',
      });
      if (getDataResponse.status === 'SUCCESS') {
        if (getDataResponse.data) {
          setShoppingList(getDataResponse.data);
        }
      }
    };
    getShoppingList();
  }, []);

  // clear async storage
  // React.useEffect(() => {
  //   clearAsyncStorage();
  // }, []);

  // write to async storage
  // React.useEffect(() => {
  //   storeDataInAsyncStorage({
  //     key: 'shoppingList',
  //     value: [
  //       { id: '1', content: 'Milk', checked: true },
  //       { id: '2', content: 'Bread', checked: false },
  //     ],
  //   });
  // }, []);

  const handleAddItemPress = () => {
    setAddModalIsOpen(true);
  };
  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };
  const addItem = async (value: string) => {
    const item = {
      id: `${Date.now()}`,
      content: value,
      checked: false,
    };
    const newShoppingList = [...shoppingList, item];
    const storeDataInAsyncStorageResponse = await storeDataInAsyncStorage({
      key: 'shoppingList',
      value: newShoppingList,
    });
    if (storeDataInAsyncStorageResponse.status === 'SUCCESS') {
      const getDataFromAsyncStorageResponse = await getDataFromAsyncStorage({
        key: 'shoppingList',
      });
      if (getDataFromAsyncStorageResponse.status === 'SUCCESS') {
        if (getDataFromAsyncStorageResponse.data) {
          setShoppingList(getDataFromAsyncStorageResponse.data);
          closeAddModal();
        }
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar style="auto" />
        <Text style={styles.header}>Better Shopping List</Text>
        <AppButton
          text="+"
          onPress={handleAddItemPress}
          style={styles.addButton}
          textStyle={styles.addButtonText}
        />
        <List shoppingList={shoppingList} />
        <AddModal
          addModalIsOpen={addModalIsOpen}
          closeAddModal={closeAddModal}
          addItem={addItem}
        />
      </View>
    </SafeAreaView>
  );
}

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
