import React from 'react';
import Search from '@theme-original/Navbar/Search';
import { useLocation } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function SearchWrapper(props) {
  const { pathname } = useLocation();
  // Resolve the homepage URL for the current locale, e.g.
  //   English  -> "/documentation/"
  //   Japanese -> "/documentation/ja/"
  // Comparing both with and without the trailing slash keeps this robust
  // regardless of how Docusaurus emits the route.
  const homeUrl = useBaseUrl('/');
  const normalize = (p) => (p.endsWith('/') ? p : `${p}/`);
  const shouldHideSearch = normalize(pathname) === normalize(homeUrl);

  if (shouldHideSearch) {
    return null;
  }

  return <Search {...props} />;
}
