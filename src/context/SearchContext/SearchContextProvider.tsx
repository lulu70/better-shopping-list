import React from 'react';

import SearchContext from './SearchContext';

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchIsFocused, setSearchIsFocused] = React.useState(false);
  const changeIsSearching = (value: boolean) => {
    setIsSearching(value);
  };
  const changeSearchIsFocused = (value: boolean) => {
    setSearchIsFocused(value);
  };

  return (
    <SearchContext.Provider
      value={{
        isSearching,
        changeIsSearching,
        searchIsFocused,
        changeSearchIsFocused,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
