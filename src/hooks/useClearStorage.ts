import React from 'react';

import { clearAsyncStorage } from '../helpers/asyncStorageHelpers';

const useClearStorage = () => {
  React.useEffect(() => {
    clearAsyncStorage();
  }, []);
};

export default useClearStorage;
