import React from 'react';
import Search from '@theme-original/Navbar/Search';
import { useLocation } from '@docusaurus/router';

export default function SearchWrapper(props) {
  const { pathname } = useLocation();
  const shouldHideSearch = pathname === '/documentation/';

  if (!shouldHideSearch) {
    return (
      <>
          <Search {...props} />
      </>
    );  
  }

  return (
    <>
    </>
  );

}
