export type InstanceKey = 'cloud' | 'onpremise' | 'legacy';
export type InstanceGroupKey = InstanceKey | 'other';

export type InstanceResolution = {
  key: InstanceGroupKey;
  label: string;
};

export const INSTANCE_ORDER: InstanceGroupKey[] = [
  'cloud',
  'onpremise',
  'legacy',
  'other',
];

export const INSTANCE_KEYS: InstanceKey[] = ['cloud', 'onpremise', 'legacy'];

const INSTANCE_LABELS: Record<InstanceGroupKey, string> = {
  cloud: 'Cloud',
  onpremise: 'On-Premise',
  legacy: 'Legacy',
  other: 'Other results',
};

const TAG_PREFIX_PATTERN = /^docs-(cloud|onpremise|legacy)-/;

const URL_SUBSTRINGS: Record<InstanceKey, string[]> = {
  cloud: ['/documentation/cloud/', '/docs/cloud/'],
  onpremise: ['/documentation/onpremise/', '/docs/onpremise/'],
  legacy: ['/documentation/legacy/', '/docs/legacy/'],
};

const normalizeTagValue = (value: unknown): string | undefined => {
  if (typeof value === 'string') {
    return value.toLowerCase();
  }

  if (Array.isArray(value) && typeof value[0] === 'string') {
    return value[0]!.toLowerCase();
  }

  return undefined;
};

const resolveFromTag = (tagValue: string | undefined): InstanceKey | undefined => {
  if (!tagValue) {
    return undefined;
  }

  const match = tagValue.match(TAG_PREFIX_PATTERN);
  if (match && match[1]) {
    return match[1] as InstanceKey;
  }

  return undefined;
};

const resolveFromUrl = (urlValue: unknown): InstanceKey | undefined => {
  if (typeof urlValue !== 'string') {
    return undefined;
  }

  const normalizedUrl = urlValue.toLowerCase();
  return (Object.entries(URL_SUBSTRINGS) as [InstanceKey, string[]][]).find(([, substrings]) =>
    substrings.some((substring) => normalizedUrl.includes(substring)),
  )?.[0];
};

export const resolveInstance = ({
  tag,
  url,
}: {
  tag?: unknown;
  url?: unknown;
}): InstanceResolution => {
  const normalizedTag = normalizeTagValue(tag);
  const tagInstance = resolveFromTag(normalizedTag);

  if (tagInstance) {
    return {
      key: tagInstance,
      label: INSTANCE_LABELS[tagInstance],
    };
  }

  const urlInstance = resolveFromUrl(url);
  if (urlInstance) {
    return {
      key: urlInstance,
      label: INSTANCE_LABELS[urlInstance],
    };
  }

  return {
    key: 'other',
    label: INSTANCE_LABELS.other,
  };
};

type MapGroupedHitsArgs<TItem, TMapped> = {
  hits: TItem[];
  getTag: (item: TItem) => unknown;
  getUrl: (item: TItem) => unknown;
  map: (params: {
    item: TItem;
    instance: InstanceResolution;
    index: number;
    isFirstInGroup: boolean;
  }) => TMapped;
  filterInstance?: (instance: InstanceResolution) => boolean;
};

export const mapGroupedHits = <TItem, TMapped>({
  hits,
  getTag,
  getUrl,
  map,
  filterInstance,
}: MapGroupedHitsArgs<TItem, TMapped>): TMapped[] => {
  const buckets: Record<InstanceGroupKey, {instance: InstanceResolution; items: TItem[]}> = {
    cloud: {instance: {key: 'cloud', label: INSTANCE_LABELS.cloud}, items: []},
    onpremise: {
      instance: {key: 'onpremise', label: INSTANCE_LABELS.onpremise},
      items: [],
    },
    legacy: {instance: {key: 'legacy', label: INSTANCE_LABELS.legacy}, items: []},
    other: {instance: {key: 'other', label: INSTANCE_LABELS.other}, items: []},
  };

  hits.forEach((item) => {
    const instance = resolveInstance({tag: getTag(item), url: getUrl(item)});

    if (filterInstance && !filterInstance(instance)) {
      return;
    }

    buckets[instance.key].items.push(item);
  });

  const mapped: TMapped[] = [];
  INSTANCE_ORDER.forEach((key) => {
    const bucket = buckets[key];
    bucket.items.forEach((item, index) => {
      mapped.push(
        map({
          item,
          index,
          instance: bucket.instance,
          isFirstInGroup: index === 0,
        }),
      );
    });
  });

  return mapped;
};

export function buildInstanceTags(
  docsData: Record<string, {versions: {name: string}[]}>,
): Record<InstanceKey, string[]> {
  const tagMap: Record<InstanceKey, string[]> = {
    cloud: [],
    onpremise: [],
    legacy: [],
  };

  INSTANCE_KEYS.forEach((instance) => {
    const pluginData = docsData?.[instance];
    if (pluginData?.versions?.length) {
      tagMap[instance] = pluginData.versions.map(
        (version) => `docs-${instance}-${version.name}`,
      );
    }
  });

  return tagMap;
}
