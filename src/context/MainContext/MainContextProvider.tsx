import React from 'react';
import { LayoutAnimation } from 'react-native';

import MainContext, { mainContextInitialState } from './MainContext';
import {
  getDataFromAsyncStorage,
  storeDataInAsyncStorage,
} from '../../helpers/asyncStorageHelpers';
// import useAddFakeItems from '../../hooks/useAddFakeItems';
// import useClearStorage from '../../hooks/useClearStorage';
import { type ItemWithId } from '../../screens/Main';

const MainContextProvider = ({ children }: { children: React.ReactNode }) => {
  // useClearStorage();
  // useAddFakeItems({
  //   updateShoppingListOnAsyncStorage,
  // });
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
        const shoppingList = getDataFromAsyncStorageResponse.data;
        const sortedShoppingList = [...shoppingList].sort((a, b) => {
          if (a.checked && !b.checked) {
            return 1;
          }
          if (!a.checked && b.checked) {
            return -1;
          }
          return 0;
        });

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShoppingList(sortedShoppingList);
      }
    }
  };

  async function updateShoppingListOnAsyncStorage(
    newShoppingList: ItemWithId[],
  ) {
    const storeDataInAsyncStorageResponse = await storeDataInAsyncStorage({
      key: 'shoppingList',
      value: newShoppingList,
    });
    if (storeDataInAsyncStorageResponse.status === 'SUCCESS') {
      getShoppingList();
    }
  }

  const addItem = async (value: string) => {
    const item = {
      id: `${Date.now()}`,
      content: value,
      checked: false,
    };
    const newShoppingList = [...shoppingList, item];
    updateShoppingListOnAsyncStorage(newShoppingList);
  };

  const editItem = async (id: string | null, value: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          content: value,
        };
      }
      return item;
    });
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
        editItem,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
