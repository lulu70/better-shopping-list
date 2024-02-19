import React from 'react';

import { ItemWithId } from '../screens/Main';

interface Params {
  updateShoppingListOnAsyncStorage: (
    newShoppingList: ItemWithId[],
  ) => Promise<void>;
}
const useAddFakeItems = ({ updateShoppingListOnAsyncStorage }: Params) => {
  React.useEffect(() => {
    const newList = [
      { id: '1', content: 'Milk', checked: false, updatedAt: 1708370416965 },
      { id: '2', content: 'Eggs', checked: false, updatedAt: 1708370416966 },
      { id: '3', content: 'Bread', checked: false, updatedAt: 1708370416967 },
      { id: '4', content: 'Butter', checked: false, updatedAt: 1708370416968 },
      { id: '5', content: 'Cheese', checked: false, updatedAt: 1708370416969 },
      { id: '6', content: 'Yogurt', checked: false, updatedAt: 1708370416970 },
      { id: '7', content: 'Chicken', checked: false, updatedAt: 1708370416971 },
      { id: '8', content: 'Beef', checked: false, updatedAt: 1708370416972 },
      { id: '9', content: 'Pork', checked: false, updatedAt: 1708370416973 },
      { id: '10', content: 'Fish', checked: false, updatedAt: 1708370416974 },
      { id: '11', content: 'Shrimp', checked: false, updatedAt: 1708370416975 },
      { id: '12', content: 'Pasta', checked: false, updatedAt: 1708370416976 },
      { id: '13', content: 'Rice', checked: false, updatedAt: 1708370416977 },
      {
        id: '14',
        content: 'Potatoes',
        checked: false,
        updatedAt: 1708370416978,
      },
      {
        id: '15',
        content: 'Tomatoes',
        checked: false,
        updatedAt: 1708370416979,
      },
      { id: '16', content: 'Onions', checked: false, updatedAt: 1708370416980 },
      { id: '17', content: 'Garlic', checked: false, updatedAt: 1708370416981 },
      {
        id: '18',
        content: 'Carrots',
        checked: false,
        updatedAt: 1708370416982,
      },
      {
        id: '19',
        content: 'Broccoli',
        checked: false,
        updatedAt: 1708370416983,
      },
      { id: '20', content: 'Apples', checked: false, updatedAt: 1708370416984 },
    ];
    updateShoppingListOnAsyncStorage(newList);
  }, []);
};

export default useAddFakeItems;
