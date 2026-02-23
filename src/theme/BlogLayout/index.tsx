import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';

import FocusModeToggle from '../../components/FocusModeToggle';
import {useFocusMode} from '../../context/focusMode';
import styles from './styles.module.css';

type BlogLayoutProps = React.ComponentProps<typeof Layout> & {
  sidebar?: React.ComponentProps<typeof BlogSidebar>['sidebar'];
  toc?: React.ReactNode;
  children: React.ReactNode;
};

export default function BlogLayout(props: BlogLayoutProps) {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = Boolean(sidebar && sidebar.items.length > 0);
  const {isFocusMode} = useFocusMode();

  const showSidebar = hasSidebar && !isFocusMode;
  const showToc = Boolean(toc) && !isFocusMode;

  const mainColumnClasses = clsx(
    'col',
    showSidebar ? 'col--7' : showToc ? 'col--9 col--offset-1' : 'col--12',
    styles.blogMain,
    isFocusMode && styles.focusModeMain,
  );

  return (
    <Layout {...layoutProps}>
      <div
        className={clsx(
          'container margin-vert--lg',
          styles.blogContainer,
          isFocusMode && styles.focusModeContainer,
        )}>
        <div className={clsx('row', styles.blogRow, isFocusMode && styles.focusModeRow)}>
          {showSidebar && <BlogSidebar sidebar={sidebar} />}
          <div className={mainColumnClasses}>
            <div className={styles.focusToggleRow}>
              <FocusModeToggle />
            </div>
            {children}
          </div>
          {showToc && <div className={clsx('col col--2', styles.blogToc)}>{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}
