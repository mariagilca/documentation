import React from 'react';

export interface FocusModeContextValue {
  isFocusMode: boolean;
  toggleFocusMode: () => void;
  setFocusMode: (value: boolean) => void;
}

export const FocusModeContext = React.createContext<FocusModeContextValue>({
  isFocusMode: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleFocusMode: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFocusMode: () => {},
});

export function useFocusMode(): FocusModeContextValue {
  return React.useContext(FocusModeContext);
}
