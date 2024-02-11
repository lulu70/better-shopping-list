import React from 'react';

import MainContext, { mainContextInitialState } from './MainContext';
import {
  getDataFromAsyncStorage,
  storeDataInAsyncStorage,
} from '../../helpers/asyncStorageHelpers';
import { type ItemWithId } from '../../screens/Main';

const MainContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [shoppingList, setShoppingList] = React.useState<ItemWithId[]>(
    mainContextInitialState.shoppingList,
  );

  const [addModalIsOpen, setAddModalIsOpen] = React.useState(false);

  React.useEffect(() => {
    getShoppingList();
  }, []);

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

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

  const addItem = async (value: string) => {
    const item = {
      id: `${Date.now()}`,
      content: value,
      checked: false,
    };
    const newShoppingList = [...shoppingList, item];
    updateShoppingListOnAsyncStorage(newShoppingList);
  };

  const changeCheckedItem = async (id: string | null) => {
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

  const deleteItem = async (id: string | null) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    updateShoppingListOnAsyncStorage(newShoppingList);
  };

  return (
    <MainContext.Provider
      value={{
        shoppingList,
        addItem,
        changeCheckedItem,
        deleteItem,
        addModalIsOpen,
        openAddModal,
        closeAddModal,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;