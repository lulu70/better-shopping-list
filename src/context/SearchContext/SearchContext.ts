import React from 'react';

export const searchContextInitialState = {
  isSearching: false,
  changeIsSearching: () => {},
};

export interface SearchContextState {
  isSearching: boolean;
  changeIsSearching: (value: boolean) => void;
}

const SearchContext = React.createContext<SearchContextState>(
  searchContextInitialState,
);

export default SearchContext;
