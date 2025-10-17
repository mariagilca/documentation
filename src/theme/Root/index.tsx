import React from 'react';

import {SearchInstanceFiltersProvider} from '../../context/searchInstanceFilters';

export default function Root({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <SearchInstanceFiltersProvider>
      {children}
    </SearchInstanceFiltersProvider>
  );
}
