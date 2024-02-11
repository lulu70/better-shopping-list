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
    getShoppingList();
  }, []);

  // clear async storage
  // React.useEffect(() => {
  //   clearAsyncStorage();
  // }, []);

  const getShoppingList = async () => {
    const getDataFromAsyncStorageResponse = await getDataFromAsyncStorage({
      key: 'shoppingList',
    });
    if (getDataFromAsyncStorageResponse.status === 'SUCCESS') {
      if (getDataFromAsyncStorageResponse.data) {
        setShoppingList(getDataFromAsyncStorageResponse.data);
      }
    }
  };

  const updateShoppingListOnAsyncStorage = async (
    newShoppingList: ItemWithId[],
  ) => {
    const storeDataInAsyncStorageResponse = await storeDataInAsyncStorage({
      key: 'shoppingList',
      value: newShoppingList,
    });
    if (storeDataInAsyncStorageResponse.status === 'SUCCESS') {
      getShoppingList();
    }
  };

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
    updateShoppingListOnAsyncStorage(newShoppingList);
  };

  const handleOnCheckedPress = async (id: string | null) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
    updateShoppingListOnAsyncStorage(newShoppingList);
  };

  const handleOnDeletePress = async (id: string | null) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    updateShoppingListOnAsyncStorage(newShoppingList);
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
        <List
          shoppingList={shoppingList}
          onCheckedPress={handleOnCheckedPress}
          onDeletePress={handleOnDeletePress}
        />
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
