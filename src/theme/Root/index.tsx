import React from 'react';

import {SearchInstanceFiltersProvider} from '../../context/searchInstanceFilters';
import {FocusModeProvider} from '../../context/focusMode';

export default function Root({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <FocusModeProvider>
      <SearchInstanceFiltersProvider>{children}</SearchInstanceFiltersProvider>
    </FocusModeProvider>
  );
}
