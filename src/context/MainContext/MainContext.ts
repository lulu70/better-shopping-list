import React from 'react';

import { ItemWithId } from '../../screens/Main';

export const mainContextInitialState = {
  shoppingList: [],
  inEditMode: false,
  goIntoEditMode: () => {},
  getOutOfEditMode: () => {},
  itemInEditMode: null,
  addModalIsOpen: false,
  openAddModal: () => {},
  closeAddModal: () => {},
  addItem: () => {},
  changeCheckedItem: () => {},
  deleteItem: () => {},
  editItem: () => {},
};

export interface MainContextState {
  shoppingList: ItemWithId[];
  inEditMode: boolean;
  goIntoEditMode: (item: ItemWithId) => void;
  getOutOfEditMode: () => void;
  itemInEditMode: ItemWithId | null;
  addModalIsOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
  addItem: (value: string) => void;
  changeCheckedItem: (id: string | null) => void;
  deleteItem: (id: string | null) => void;
  editItem: (id: string | null, value: string) => void;
}

const MainContext = React.createContext<MainContextState>(
  mainContextInitialState,
);

export default MainContext;
