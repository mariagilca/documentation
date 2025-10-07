/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {createPortal} from 'react-dom';
import {DocSearchButton} from '@docsearch/react/button';
import {useDocSearchKeyboardEvents} from '@docsearch/react/useDocSearchKeyboardEvents';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import {useAllDocsData} from '@docusaurus/plugin-content-docs/client';
import {
  isRegexpStringMatch,
  useSearchLinkCreator,
} from '@docusaurus/theme-common';
import {
  useAlgoliaContextualFacetFilters,
  useSearchResultUrlProcessor,
  useAlgoliaAskAi,
  mergeFacetFilters,
} from '@docusaurus/theme-search-algolia/client';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import translations from '@theme/SearchTranslations';
import type {
  InternalDocSearchHit,
  DocSearchModal as DocSearchModalType,
  DocSearchModalProps,
  StoredDocSearchHit,
  DocSearchTransformClient,
  DocSearchHit,
  DocSearchTranslations,
  UseDocSearchKeyboardEventsProps,
} from '@docsearch/react';

import {
  mapGroupedHits,
  type InstanceGroupKey,
  type InstanceKey,
  buildInstanceTags,
} from '../../utils/searchInstanceGrouping';
import SearchInstanceFilter from '../../components/SearchInstanceFilter';
import {useSearchInstanceFilters} from '../../context/searchInstanceFilters';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

import type {AutocompleteState} from '@algolia/autocomplete-core';
import type {FacetFilters} from 'algoliasearch/lite';
import type {ThemeConfigAlgolia} from '@docusaurus/theme-search-algolia';

type DocSearchProps = Omit<
  DocSearchModalProps,
  'onClose' | 'initialScrollY'
> & {
  contextualSearch?: string;
  externalUrlRegex?: string;
  searchPagePath: boolean | string;
  askAi?: Exclude<
    (DocSearchModalProps & {askAi: unknown})['askAi'],
    string | undefined
  >;
};

// extend DocSearchProps for v4 features
// TODO Docusaurus v4: cleanup after we drop support for DocSearch v3
interface DocSearchV4Props extends DocSearchProps {
  indexName: string;
  askAi?: ThemeConfigAlgolia['askAi'];
  translations?: DocSearchTranslations;
}

let DocSearchModal: typeof DocSearchModalType | null = null;

const groupHitsByInstance = (
  items: DocSearchHit[],
  filterInstance: (instanceKey: InstanceGroupKey) => boolean,
): DocSearchHit[] =>
  mapGroupedHits({
    hits: items,
    getTag: (hit) => (hit as {docusaurus_tag?: unknown}).docusaurus_tag,
    getUrl: (hit) => hit.url,
    filterInstance: ({key}) => filterInstance(key),
    map: ({item, instance, isFirstInGroup}) => {
      const annotatedItem = {
        ...item,
        __docsearchInstanceKey: instance.key,
        __docsearchInstanceLabel: instance.label,
      } as DocSearchHit & Record<string, unknown>;

      if (isFirstInGroup) {
        annotatedItem.__docsearchGroupHeading = instance.label;
        annotatedItem.__docsearchIsGroupFirst = true;
      } else {
        delete (annotatedItem as Record<string, unknown>).__docsearchGroupHeading;
        delete (annotatedItem as Record<string, unknown>).__docsearchIsGroupFirst;
      }

      return annotatedItem;
    },
  });

function importDocSearchModalIfNeeded() {
  if (DocSearchModal) {
    return Promise.resolve();
  }
  return Promise.all([
    import('@docsearch/react/modal'),
    import('@docsearch/react/style'),
    import('./styles.css'),
  ]).then(([{DocSearchModal: Modal}]) => {
    DocSearchModal = Modal;
  });
}

function useNavigator({
  externalUrlRegex,
}: Pick<DocSearchProps, 'externalUrlRegex'>) {
  const history = useHistory();
  const [navigator] = useState<DocSearchModalProps['navigator']>(() => {
    return {
      navigate(params) {
        // Algolia results could contain URL's from other domains which cannot
        // be served through history and should navigate with window.location
        if (isRegexpStringMatch(externalUrlRegex, params.itemUrl)) {
          window.location.href = params.itemUrl;
        } else {
          history.push(params.itemUrl);
        }
      },
    };
  });
  return navigator;
}

function useTransformSearchClient(): DocSearchModalProps['transformSearchClient'] {
  const {
    siteMetadata: {docusaurusVersion},
  } = useDocusaurusContext();
  return useCallback(
    (searchClient: DocSearchTransformClient) => {
      searchClient.addAlgoliaAgent('docusaurus', docusaurusVersion);
      return searchClient;
    },
    [docusaurusVersion],
  );
}

function useTransformItems(
  props: Pick<DocSearchProps, 'transformItems'>,
  filterInstance: (instanceKey: InstanceGroupKey) => boolean,
) {
  const processSearchResultUrl = useSearchResultUrlProcessor();
  return useMemo<DocSearchModalProps['transformItems']>(
    () =>
      (items: DocSearchHit[]) => {
        const baseItems = props.transformItems
          ? props.transformItems(items)
          : items;

        const normalizedItems = baseItems.map((item) => ({
          ...item,
          url: processSearchResultUrl(item.url),
        }));

        return groupHitsByInstance(normalizedItems, filterInstance);
      },
    [processSearchResultUrl, props.transformItems, filterInstance],
  );
}

function useResultsFooterComponent({
  closeModal,
}: {
  closeModal: () => void;
}): DocSearchProps['resultsFooterComponent'] {
  return useMemo(
    () =>
      ({state}) =>
        <ResultsFooter state={state} onClose={closeModal} />,
    [closeModal],
  );
}

function Hit({
  hit,
  children,
}: {
  hit: InternalDocSearchHit | StoredDocSearchHit;
  children: ReactNode;
}) {
  const groupHeading = (hit as Record<string, unknown>).__docsearchGroupHeading;
  const isFirstInGroup = Boolean(
    (hit as Record<string, unknown>).__docsearchIsGroupFirst,
  );
  const linkClassNames = ['DocSearch-GroupedHit'];
  if (isFirstInGroup) {
    linkClassNames.push('DocSearch-GroupedHit--first');
  }
  const linkClassName = linkClassNames.join(' ');

  return (
    <>
      {typeof groupHeading === 'string' ? (
        <div className="DocSearch-GroupHeading" aria-hidden="true">
          {groupHeading}
        </div>
      ) : null}
      <Link to={hit.url} className={linkClassName}>
        {children}
      </Link>
    </>
  );
}

type ResultsFooterProps = {
  state: AutocompleteState<InternalDocSearchHit>;
  onClose: () => void;
};

function ResultsFooter({state, onClose}: ResultsFooterProps) {
  const createSearchLink = useSearchLinkCreator();

  return (
    <Link to={createSearchLink(state.query)} onClick={onClose}>
      <Translate
        id="theme.SearchBar.seeAll"
        values={{count: state.context.nbHits}}>
        {'See all {count} results'}
      </Translate>
    </Link>
  );
}

function useSearchParameters({
  contextualSearch,
  ...props
}: DocSearchProps): DocSearchProps['searchParameters'] {
  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters();

  const configFacetFilters: FacetFilters =
    props.searchParameters?.facetFilters ?? [];

  const facetFilters: FacetFilters = contextualSearch
    ? // Merge contextual search filters with config filters
      mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
    : // ... or use config facetFilters
      configFacetFilters;

  // We let users override default searchParameters if they want to
  return {
    ...props.searchParameters,
    facetFilters,
  };
}

function DocSearch({externalUrlRegex, ...props}: DocSearchV4Props) {
  const allDocsData = useAllDocsData();
  const instanceTags = useMemo(
    () => buildInstanceTags(allDocsData as Record<string, {versions: {name: string}[]}>),
    [allDocsData],
  );
  const {selectedInstances, allSelected} = useSearchInstanceFilters();
  const selectedInstanceSet = useMemo(
    () => new Set<InstanceKey>(selectedInstances),
    [selectedInstances],
  );
  const filterInstance = useCallback(
    (instanceKey: InstanceGroupKey) =>
      instanceKey === 'other'
        ? allSelected
        : selectedInstanceSet.has(instanceKey as InstanceKey),
    [selectedInstanceSet, allSelected],
  );
  const navigator = useNavigator({externalUrlRegex});
  const selectedTagValues = useMemo(() => {
    if (allSelected) {
      return [];
    }

    const tagSet = new Set<string>();
    selectedInstances.forEach((instance) => {
      (instanceTags[instance] ?? []).forEach((tag) => {
        tagSet.add(tag);
      });
    });

    return Array.from(tagSet);
  }, [allSelected, selectedInstances, instanceTags]);

  const instanceFacetFilters = useMemo<FacetFilters>(() => {
    if (selectedTagValues.length === 0) {
      return [];
    }

    return [selectedTagValues.map((tag) => `docusaurus_tag:${tag}`)];
  }, [selectedTagValues]);

  const searchParametersWithFilters = useMemo(() => {
    const baseParameters = props.searchParameters ?? {};
    const baseFacetFilters = baseParameters.facetFilters ?? [];
    const mergedFacetFilters = instanceFacetFilters.length
      ? mergeFacetFilters(baseFacetFilters, instanceFacetFilters)
      : baseFacetFilters;

    return {
      ...baseParameters,
      facetFilters: mergedFacetFilters,
    };
  }, [props.searchParameters, instanceFacetFilters]);

  const searchParameters = useSearchParameters({
    ...props,
    searchParameters: searchParametersWithFilters,
  });
  const transformItems = useTransformItems(props, filterInstance);
  const transformSearchClient = useTransformSearchClient();

  const searchContainer = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | undefined>(
    undefined,
  );

  const {isAskAiActive, currentPlaceholder, onAskAiToggle, extraAskAiProps} =
    useAlgoliaAskAi(props);

  const prepareSearchContainer = useCallback(() => {
    if (!searchContainer.current) {
      const divElement = document.createElement('div');
      searchContainer.current = divElement;
      document.body.insertBefore(divElement, document.body.firstChild);
    }
  }, []);

  const openModal = useCallback(() => {
    prepareSearchContainer();
    importDocSearchModalIfNeeded().then(() => setIsOpen(true));
  }, [prepareSearchContainer]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    searchButtonRef.current?.focus();
    setInitialQuery(undefined);
    onAskAiToggle(false);
  }, [onAskAiToggle]);

  const handleInput = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'f' && (event.metaKey || event.ctrlKey)) {
        // ignore browser's ctrl+f
        return;
      }
      // prevents duplicate key insertion in the modal input
      event.preventDefault();
      setInitialQuery(event.key);
      openModal();
    },
    [openModal],
  );

  const resultsFooterComponent = useResultsFooterComponent({closeModal});

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen: openModal,
    onClose: closeModal,
    onInput: handleInput,
    searchButtonRef,
    isAskAiActive: isAskAiActive ?? false,
    onAskAiToggle: onAskAiToggle ?? (() => {}),
  } satisfies UseDocSearchKeyboardEventsProps & {
    // TODO Docusaurus v4: cleanup after we drop support for DocSearch v3
    isAskAiActive: boolean;
    onAskAiToggle: (askAiToggle: boolean) => void;
  } as UseDocSearchKeyboardEventsProps);

  return (
    <>
      <Head>
        {/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
        <link
          rel="preconnect"
          href={`https://${props.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      <DocSearchButton
        onTouchStart={importDocSearchModalIfNeeded}
        onFocus={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={openModal}
        ref={searchButtonRef}
        translations={props.translations?.button ?? translations.button}
      />

      {isOpen &&
        DocSearchModal &&
        searchContainer.current &&
        createPortal(
          <DocSearchModal
            onClose={closeModal}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            transformSearchClient={transformSearchClient}
            {...(props.searchPagePath && {
              resultsFooterComponent,
            })}
            placeholder={currentPlaceholder}
            {...props}
            translations={props.translations?.modal ?? translations.modal}
            searchParameters={searchParameters}
            {...extraAskAiProps}
          />,
          searchContainer.current,
        )}
      <DocSearchFilters isOpen={isOpen} />
    </>
  );
}

function DocSearchFilters({isOpen}: {isOpen: boolean}) {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || !ExecutionEnvironment.canUseDOM) {
      setPortalNode(null);
      return undefined;
    }

    const dropdownContainer = document.querySelector(
      '.DocSearch-Dropdown-Container',
    );
    const hitsSection = dropdownContainer?.querySelector(
      '.DocSearch-Hits',
    );
    const askAiSection = dropdownContainer?.querySelector(
      '.DocSearch-AskAi',
    );
    const referenceElement = hitsSection ?? askAiSection;
    const parent = referenceElement?.parentElement;

    if (!dropdownContainer || !referenceElement || !parent) {
      return undefined;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'DocSearch-Filters';
    parent.insertBefore(wrapper, referenceElement);
    setPortalNode(wrapper);

    return () => {
      wrapper.remove();
      setPortalNode(null);
    };
  }, [isOpen]);

  if (!portalNode) {
    return null;
  }

  return createPortal(
    <SearchInstanceFilter
      variant="compact"
      className="DocSearch-FiltersWidget"
    />,
    portalNode,
  );
}

export default function SearchBar(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <DocSearch {...(siteConfig.themeConfig.algolia as DocSearchV4Props)} />
  );
}
