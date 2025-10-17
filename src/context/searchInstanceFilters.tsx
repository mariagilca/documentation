import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {INSTANCE_KEYS, type InstanceKey} from '../utils/searchInstanceGrouping';

type SearchInstanceFiltersContextValue = {
  selectedInstances: InstanceKey[];
  toggleInstance: (key: InstanceKey) => void;
  isInstanceSelected: (key: InstanceKey) => boolean;
  setInstances: (keys: InstanceKey[]) => void;
  allSelected: boolean;
  selectAll: () => void;
};

const DEFAULT_INSTANCES: InstanceKey[] = [...INSTANCE_KEYS];

const SearchInstanceFiltersContext = createContext<
  SearchInstanceFiltersContextValue | undefined
>(undefined);

export function SearchInstanceFiltersProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedInstances, setSelectedInstances] = useState<InstanceKey[]>(
    DEFAULT_INSTANCES,
  );

  const setInstances = useCallback((keys: InstanceKey[]) => {
    setSelectedInstances(keys.length > 0 ? keys : DEFAULT_INSTANCES);
  }, []);

  const toggleInstance = useCallback((key: InstanceKey) => {
    setSelectedInstances((prev) => {
      const hasKey = prev.includes(key);

      if (hasKey && prev.length === 1) {
        return prev;
      }

      if (hasKey) {
        return prev.filter((value) => value !== key);
      }

      return [...prev, key];
    });
  }, []);

  const isInstanceSelected = useCallback(
    (key: InstanceKey) => selectedInstances.includes(key),
    [selectedInstances],
  );

  const selectAll = useCallback(() => {
    setSelectedInstances(DEFAULT_INSTANCES);
  }, []);

  const value = useMemo<SearchInstanceFiltersContextValue>(
    () => ({
      selectedInstances,
      toggleInstance,
      isInstanceSelected,
      setInstances,
      allSelected: selectedInstances.length === DEFAULT_INSTANCES.length,
      selectAll,
    }),
    [
      selectedInstances,
      toggleInstance,
      isInstanceSelected,
      setInstances,
      selectAll,
    ],
  );

  return (
    <SearchInstanceFiltersContext.Provider value={value}>
      {children}
    </SearchInstanceFiltersContext.Provider>
  );
}

export function useSearchInstanceFilters() {
  const context = useContext(SearchInstanceFiltersContext);

  if (!context) {
    throw new Error(
      'useSearchInstanceFilters must be used within a SearchInstanceFiltersProvider',
    );
  }

  return context;
}
