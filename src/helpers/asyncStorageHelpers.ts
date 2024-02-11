import AsyncStorage from '@react-native-async-storage/async-storage';

import { ItemWithId } from '../screens/Main';

type ResponseStatus = 'SUCCESS' | 'ERROR' | 'EMPTY';

export interface StoreDataInAsyncStorageParams {
  key: 'shoppingList';
  value: ItemWithId[];
}

type StoreDataInAsyncStorage = ({
  key,
  value,
}: StoreDataInAsyncStorageParams) => Promise<{
  status: ResponseStatus;
}>;

export const storeDataInAsyncStorage: StoreDataInAsyncStorage = async ({
  key,
  value,
}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return { status: 'SUCCESS' };
  } catch (e) {
    console.error(e);
    return {
      status: 'ERROR',
    };
  }
};

export interface GetDataFromAsyncStorageParams {
  key: 'shoppingList';
}

type GetDataFromAsyncStorage = ({
  key,
}: GetDataFromAsyncStorageParams) => Promise<{
  status: ResponseStatus;
  data?: ItemWithId[] | null;
}>;

export const getDataFromAsyncStorage: GetDataFromAsyncStorage = async ({
  key,
}) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null
      ? { status: 'SUCCESS', data: JSON.parse(jsonValue) }
      : { status: 'EMPTY', data: null };
  } catch (e) {
    console.error(e);
    return { status: 'ERROR' };
  }
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error(e);
  }
};
