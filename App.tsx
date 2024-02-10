import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import theme from './constants/theme';
import { horizontalScale, verticalScale } from './helpers/scaleHelpers';
import { getDataFromAsyncStorage } from './helpers/asyncStorageHelpers';

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
        <FlatList
          contentContainerStyle={styles.list}
          data={shoppingList}
          renderItem={({ item }) => (
            <View style={styles.listItem} key={item.id}>
              <Text style={styles.checkedIcon}>
                {item.checked ? '✔️' : '◯'}
              </Text>
              <Text>{item.content}</Text>
            </View>
          )}
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
  list: {
    marginTop: verticalScale(theme.spacing.spacing_10),
  },
  listItem: {
    flexDirection: 'row',
    marginTop: verticalScale(theme.spacing.spacing_6),
  },
  checkedIcon: { marginRight: horizontalScale(theme.spacing.spacing_12) },
});
