import React from 'react';
import {useLocation} from '@docusaurus/router';
import {useActivePlugin} from '@docusaurus/plugin-content-docs/client';

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

export function FocusModeProvider({children}: {children: React.ReactNode}) {
  const [isFocusMode, setIsFocusMode] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.localStorage.getItem('docsFocusMode') === 'true';
  });

  const toggleFocusMode = React.useCallback(() => {
    setIsFocusMode((value) => !value);
  }, []);

  const setFocusMode = React.useCallback((value: boolean) => {
    setIsFocusMode(value);
  }, []);

  // Focus mode is only *applied* on docs routes, where FocusModeToggle is
  // rendered and can turn it back off. The stored preference survives, so
  // leaving the docs (homepage, search, ...) restores navbar/footer instead
  // of trapping the user chrome-less, and focus resumes on the next doc page.
  const location = useLocation();
  const activeDocsPlugin = useActivePlugin();
  const isDocsRoute = activeDocsPlugin !== undefined;
  const isFocusModeApplied = isFocusMode && isDocsRoute;

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (isFocusMode) {
      window.localStorage.setItem('docsFocusMode', 'true');
    } else {
      window.localStorage.removeItem('docsFocusMode');
    }
  }, [isFocusMode]);

  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const body = document.body;
    const focusClass = 'docs-focus-mode';
    const hiddenClass = 'docs-focus-hidden';
    const hiddenSelectors = [
      'header.navbar',
      '.navbar',
      '.navbar__placeholder',
      'footer.theme-layout-footer',
      '.theme-layout-footer',
    ];
    const elementsToHide = hiddenSelectors.reduce<HTMLElement[]>((elements, selector) => {
      elements.push(...Array.from(document.querySelectorAll<HTMLElement>(selector)));
      return elements;
    }, []);

    if (isFocusModeApplied) {
      body.classList.add(focusClass);
      elementsToHide.forEach((element) => element.classList.add(hiddenClass));
    } else {
      body.classList.remove(focusClass);
      elementsToHide.forEach((element) => element.classList.remove(hiddenClass));
    }

    return () => {
      body.classList.remove(focusClass);
      elementsToHide.forEach((element) => element.classList.remove(hiddenClass));
    };
    // location.pathname is a dependency so the effect re-evaluates on
    // client-side navigation (docs -> homepage and back), not just on toggle.
  }, [isFocusModeApplied, location.pathname]);

  const value = React.useMemo(
    () => ({
      // Expose the route-scoped value: consumers outside docs routes must
      // never see focus mode "on" while the page chrome is visible.
      isFocusMode: isFocusModeApplied,
      toggleFocusMode,
      setFocusMode,
    }),
    [isFocusModeApplied, toggleFocusMode, setFocusMode],
  );

  return <FocusModeContext.Provider value={value}>{children}</FocusModeContext.Provider>;
}
