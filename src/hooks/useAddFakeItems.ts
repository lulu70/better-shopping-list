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
      { id: '1', content: 'Milk', checked: false },
      { id: '2', content: 'Eggs', checked: false },
      { id: '3', content: 'Bread', checked: false },
      { id: '4', content: 'Butter', checked: false },
      { id: '5', content: 'Cheese', checked: false },
      { id: '6', content: 'Yogurt', checked: false },
      { id: '7', content: 'Chicken', checked: false },
      { id: '8', content: 'Beef', checked: false },
      { id: '9', content: 'Pork', checked: false },
      { id: '10', content: 'Fish', checked: false },
      { id: '11', content: 'Shrimp', checked: false },
      { id: '12', content: 'Pasta', checked: false },
      { id: '13', content: 'Rice', checked: false },
      { id: '14', content: 'Potatoes', checked: false },
      { id: '15', content: 'Tomatoes', checked: false },
      { id: '16', content: 'Onions', checked: false },
      { id: '17', content: 'Garlic', checked: false },
      { id: '18', content: 'Carrots', checked: false },
      { id: '19', content: 'Broccoli', checked: false },
      { id: '20', content: 'Apples', checked: false },
    ];
    updateShoppingListOnAsyncStorage(newList);
  }, []);
};

export default useAddFakeItems;
