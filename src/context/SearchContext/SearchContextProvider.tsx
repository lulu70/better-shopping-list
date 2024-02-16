import React from 'react';

import SearchContext from './SearchContext';

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSearching, setIsSearching] = React.useState(false);

  const changeIsSearching = (value: boolean) => {
    setIsSearching(value);
  };

  return (
    <SearchContext.Provider
      value={{
        isSearching,
        changeIsSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
