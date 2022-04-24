import type {
  DetailedKeyApiKeys,
  DetailedKeyApiAttributes,
} from 'pages/DetailedKey/types.DetailedKey';

export const KeyDetailedApiNames: Record<
  DetailedKeyApiKeys,
  DetailedKeyApiAttributes
> = {
  trackNum: { label: 'API 1', color: '#E17076' },
  status: { label: 'API 2', color: '#A695E7' },
  track: { label: 'API 3', color: '#FAA774' },
};
