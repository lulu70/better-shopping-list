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
      {
        id: '1708370416965',
        content: 'Milk',
        checked: false,
        updatedAt: 1708370416965,
      },
      {
        id: '1708370416966',
        content: 'Eggs',
        checked: false,
        updatedAt: 1708370416966,
      },
      {
        id: '1708370416967',
        content: 'Bread',
        checked: false,
        updatedAt: 1708370416967,
      },
      {
        id: '1708370416968',
        content: 'Butter',
        checked: false,
        updatedAt: 1708370416968,
      },
      {
        id: '1708370416969',
        content: 'Cheese',
        checked: false,
        updatedAt: 1708370416969,
      },
      {
        id: '1708370416970',
        content: 'Yogurt',
        checked: false,
        updatedAt: 1708370416970,
      },
      {
        id: '1708370416971',
        content: 'Chicken',
        checked: false,
        updatedAt: 1708370416971,
      },
      {
        id: '1708370416972',
        content: 'Beef',
        checked: false,
        updatedAt: 1708370416972,
      },
      {
        id: '1708370416973',
        content: 'Pork',
        checked: false,
        updatedAt: 1708370416973,
      },
      {
        id: '1708370416974',
        content: 'Fish',
        checked: false,
        updatedAt: 1708370416974,
      },
      {
        id: '1708370416975',
        content: 'Shrimp',
        checked: false,
        updatedAt: 1708370416975,
      },
      {
        id: '1708370416976',
        content: 'Pasta',
        checked: false,
        updatedAt: 1708370416976,
      },
      {
        id: '1708370416977',
        content: 'Rice',
        checked: false,
        updatedAt: 1708370416977,
      },
      {
        id: '1708370416978',
        content: 'Potatoes',
        checked: false,
        updatedAt: 1708370416978,
      },
      {
        id: '1708370416979',
        content: 'Tomatoes',
        checked: false,
        updatedAt: 1708370416979,
      },
      {
        id: '1708370416980',
        content: 'Onions',
        checked: false,
        updatedAt: 1708370416980,
      },
      {
        id: '1708370416981',
        content: 'Garlic',
        checked: false,
        updatedAt: 1708370416981,
      },
      {
        id: '1708370416982',
        content: 'Carrots',
        checked: false,
        updatedAt: 1708370416982,
      },
      {
        id: '1708370416983',
        content: 'Broccoli',
        checked: false,
        updatedAt: 1708370416983,
      },
      {
        id: '1708370416984',
        content: 'Apples',
        checked: false,
        updatedAt: 1708370416984,
      },
    ];
    updateShoppingListOnAsyncStorage(newList);
  }, []);
};

export default useAddFakeItems;
