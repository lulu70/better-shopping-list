import React from 'react';

export const searchContextInitialState = {
  isSearching: false,
  changeIsSearching: () => {},
  searchIsFocused: false,
  changeSearchIsFocused: () => {},
};

export interface SearchContextState {
  isSearching: boolean;
  changeIsSearching: (value: boolean) => void;
  searchIsFocused: boolean;
  changeSearchIsFocused: (value: boolean) => void;
}

const SearchContext = React.createContext<SearchContextState>(
  searchContextInitialState,
);

export default SearchContext;
