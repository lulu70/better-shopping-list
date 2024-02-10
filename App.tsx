import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import theme from './constants/theme';
import { horizontalScale, verticalScale } from './helpers/scaleHelpers';
import { getDataFromAsyncStorage } from './helpers/asyncStorageHelpers';
import List from './components/List';

export interface Item {
  content: string;
  checked: boolean;
}
export interface ItemWithId extends Item {
  id: string | null;
}

export default function App() {
  const [shoppingList, setShoppingList] = React.useState<ItemWithId[]>([]);

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
  //     value: [{ id: '1', content: 'Milks', checked: true }],
  //   });
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <StatusBar style="auto" />
        <Text style={styles.header}>Better Shopping List</Text>
        <List shoppingList={shoppingList} />
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
});
