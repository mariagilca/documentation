import React from 'react';
import Original from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';
import {useActivePlugin} from '@docusaurus/plugin-content-docs/client';

export default function DocsVersionDropdownNavbarItemWrapper(props) {
  const active = useActivePlugin();
  const wantedId = props.docsPluginId ?? 'default'; // if "??" bothers your setup, use: props.docsPluginId || 'default'
  if (!active || active.pluginId !== wantedId) return null;
  return <Original {...props} />;
}